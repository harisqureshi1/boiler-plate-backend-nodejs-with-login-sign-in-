import { NextFunction, Request, Response } from 'express';
import { ActionEnum, ResponseStatusCodesEnum } from '../../constants';
import { customErrors, ErrorHandler } from '../../errors';
// import { IRequestExtended } from '../../interfaces';
import { tokenVerification } from '../../helpers';
import { userService } from '../../services';

export const checkConfirmTokenMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.params.token;
    if (!token) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, customErrors.BAD_REQUEST_NO_TOKEN.message));
    }
    await tokenVerification(ActionEnum.USER_REGISTER, token);
    const userByToken = await userService.findUserByActionToken(ActionEnum.USER_REGISTER, token);
    if (!userByToken) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
    }
    req.user = userByToken;

    next();
  } catch (e) {
    next(e);
  }
};
