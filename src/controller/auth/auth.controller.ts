import { NextFunction, Request, Response } from 'express';
import { ActionEnum, RequestHeadersEnum, ResponseStatusCodesEnum } from '../../constants';
import { customErrors, ErrorHandler } from '../../errors';
import { comparePassword, tokenGenerator } from '../../helpers';
import { IUser } from '../../interfaces';
import { authService, userService } from '../../services';
import * as jwt from 'jsonwebtoken';
import { config } from '../../config';

class AuthController {
  async authUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id, password, login, email, photo = '' } = req.user as IUser;
      console.log(password);
      const authInfo = req.body;
      console.log(authInfo.password);
      const isPasswordEquals = await comparePassword(authInfo.password, password);

      if (!isPasswordEquals) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
      }

      const { access_token, refresh_token } = tokenGenerator(ActionEnum.USER_AUTH);

      await authService.createTokenPair({
        accessToken: access_token,
        refreshToken: refresh_token,
        userId: _id
      });

      res.json({ access_token, refresh_token, _id, login, email, photo });
    } catch (e) {
      return next(e);
    }
  }

  async logoutUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.get(RequestHeadersEnum.AUTHORIZATION);
    await authService.removeToken({ accessToken });
    res.sendStatus(ResponseStatusCodesEnum.NO_CONTENT);
  }

  async checkEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const found = await userService.findOneByParams({ email }) ? true : false;
    res.json({ found });
  }

  verifyAuth(req: Request, res: Response, next: NextFunction){
    try {
      let decoded = null;
      let accessToken = req.get(RequestHeadersEnum.AUTHORIZATION) as string;
      if (accessToken?.includes('Bearer')){
        accessToken = accessToken.split(' ')[1];
      }
      const JWT_SECRET = config.JWT_SECRET as string;
      if (accessToken) {
        decoded = jwt.verify(accessToken, JWT_SECRET) ;
      }
      if (decoded) {
        next();
      } else {
        res
          .status(401)
          .json({ err: 'You need to be logged in to access this data' });
      }
    }
    catch (error) {
      console.log('auth error: ', error);
      next({
        message: 'Auth failed',
        status: 401
      });
    }
  }
}

export const authController = new AuthController();
