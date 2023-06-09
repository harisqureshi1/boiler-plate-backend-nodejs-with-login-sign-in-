import { NextFunction, Request, Response } from 'express';

import { userService } from '../../services';
import { customErrors, ErrorHandler } from '../../errors';
import { ResponseStatusCodesEnum } from '../../constants';
// import { IRequestExtended } from '../../interfaces';

export const checkIsUserExistByEmailMiddleware =
  async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
    const { email } = req.body;
    const userByEmail = await userService.findOneByParams({ email });

    if (!userByEmail) {
      return next(new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, customErrors.NOT_FOUND.message));
    }

    req.user = userByEmail;
    next();
  };
