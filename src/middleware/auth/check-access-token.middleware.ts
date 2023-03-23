import { NextFunction, Request, Response } from 'express';
import { ActionEnum, RequestHeadersEnum, ResponseStatusCodesEnum } from '../../constants';
import { customErrors, ErrorHandler } from '../../errors';
import { authService } from '../../services';
import { tokenVerification } from '../../helpers';

export const checkAccessTokenMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try {
    const token = req.get(RequestHeadersEnum.AUTHORIZATION);

    if (!token) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NO_TOKEN.message));
    }

    await tokenVerification(ActionEnum.USER_AUTH, token);

    const userByToken = await authService.findUserByToken({ accessToken: token });

    if (!userByToken) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
    }

    req.user = userByToken;

    next();
  } catch (e) {
    next(e);
  }
};
