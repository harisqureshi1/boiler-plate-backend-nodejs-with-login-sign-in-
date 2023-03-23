import { NextFunction, Request, Response } from 'express';
import { customErrors, ErrorHandler } from '../../errors';
import { ResponseStatusCodesEnum, UserStatusEnum } from '../../constants';
import { IUser } from '../../interfaces';

export const checkIsUserConfirmedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void | NextFunction => {
  const { status } = req.user as IUser;

  if (status !== UserStatusEnum.CONFIRMED) {
    return next(new ErrorHandler(
      ResponseStatusCodesEnum.FORBIDDEN,
      customErrors.FORBIDDEN_USER_NOT_CONFIRMED.message,
      customErrors.FORBIDDEN_USER_NOT_CONFIRMED.code
    ));
  }

  next();
};
