import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import { ActionEnum, LogEnum, RequestHeadersEnum, ResponseStatusCodesEnum, UserStatusEnum } from '../../constants';
import { customErrors, ErrorHandler } from '../../errors';
import { hashPassword, tokenGenerator } from '../../helpers';
import { IUser } from '../../interfaces';
import { logService, userService } from '../../services';
import { newUserValidator } from '../../validators';
import { config } from '../../config';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body as IUser;

    user.photo = config.DEFAULT_AVATAR;

    const { error } = Joi.validate(user, newUserValidator);

    if (error){
      return next(new Error(error.details[0].message));
    }

    user.password = await hashPassword(user.password);

    const { _id } = await userService.createUser(user);
    const { access_token } = tokenGenerator(ActionEnum.USER_REGISTER);
    await userService.addActionToken(_id, { action: ActionEnum.USER_REGISTER, token: access_token });
    await logService.createLog({ event: LogEnum.USER_REGISTERED, userId: _id });

    res.sendStatus(ResponseStatusCodesEnum.CREATED);
  }

  async confirmUser(req: Request, res: Response, next: NextFunction) {

    const { _id, status, tokens = [] } = req.user as IUser;
    const tokenToDelete = req.get(RequestHeadersEnum.AUTHORIZATION);

    if (status !== UserStatusEnum.PENDING) {
      return next(
        new ErrorHandler(
          ResponseStatusCodesEnum.BAD_REQUEST,
          customErrors.BAD_REQUEST_USER_ACTIVATED.message,
          customErrors.BAD_REQUEST_USER_ACTIVATED.code
        )
      );
    }

    await userService.updateUserByParams({ _id }, { status: UserStatusEnum.CONFIRMED });

    const index = tokens.findIndex(({ action, token }) => {
      return token === tokenToDelete && action === ActionEnum.USER_REGISTER;
    });

    if (index !== -1) {
      tokens.splice(index, 1);

      await userService.updateUserByParams({ _id }, { tokens } as Partial<IUser>);
    }

    await logService.createLog({ event: LogEnum.USER_CONFIRMED, userId: _id });

    res.redirect(config.FRONTEND_URL);
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    const { _id } = req.user as IUser;
    const { access_token } = tokenGenerator(ActionEnum.FORGOT_PASSWORD);
    await userService.addActionToken(_id, { token:access_token, action: ActionEnum.FORGOT_PASSWORD });

    res.end();
  }

  async setForgotPass(req: Request, res: Response, next: NextFunction) {
    const { _id, tokens = [] } = req.user as IUser;
    const { password } = req.body;
    const tokenToDelete = req.get(RequestHeadersEnum.AUTHORIZATION);
    const hashPass = await hashPassword(password);

    await userService.updateUserByParams({ _id }, { password: hashPass });

    const index = tokens.findIndex(({ action, token }) => {
      return token === tokenToDelete && action === ActionEnum.FORGOT_PASSWORD;
    });

    if (index !== -1) {
      tokens.splice(index, 1);

      await userService.updateUserByParams({ _id }, { tokens } as Partial<IUser>);
    }

    res.end();
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    const { _id } = req.user as IUser;
    const user = await userService.findOneByParams({_id});
    res.json(user);
  }

  async updateUserSettings(req: Request, res: Response, next: NextFunction) {
    const { _id, password } = req.user as IUser;
    const { name, newPassword } = req.body;
    console.log('password: ',password);
    let hashPass = '';
    if (newPassword){
      hashPass = await hashPassword(newPassword);
    }
    await userService.updateUserByParams({ _id }, {login: name, password: hashPass ? hashPass : password });
    res.end();
  }
}

export const userController = new UserController();
