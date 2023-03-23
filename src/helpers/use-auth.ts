import { NextFunction, Request, Response } from 'express';
import * as passport from 'passport';
import { RequestHeadersEnum, ResponseStatusCodesEnum } from '../constants';

export const useAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (error: any, user: any) => {
    try {
      const token = req.get(RequestHeadersEnum.AUTHORIZATION);

      if (error || !user || token !== user.token) {
        return res.status(ResponseStatusCodesEnum.UNAUTHORIZED).json({
          status: 'error',
          code: ResponseStatusCodesEnum.UNAUTHORIZED,
          message: 'Not authorized'
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(ResponseStatusCodesEnum.BAD_REQUEST).json({
        status: 'error',
        code: ResponseStatusCodesEnum.BAD_REQUEST,
        message: 'Invalid request body / Token not provided'
      });
    }
  })(req, res, next);
};
