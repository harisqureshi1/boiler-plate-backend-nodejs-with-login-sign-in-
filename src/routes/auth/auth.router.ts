import { Router } from 'express';
import { authController } from '../../controller';
import {
  checkAccessTokenMiddleware,
  checkIsUserConfirmedMiddleware,
  checkIsUserExistByEmailMiddleware,
  emailPasswordValidatorMiddleware,
  emailValidatorMiddleware
} from '../../middleware';

const router = Router();

router.post(
  '/checkEmail',
  emailValidatorMiddleware,
  authController.checkEmail
);

router.post(
  '/',
  emailPasswordValidatorMiddleware,
  checkIsUserExistByEmailMiddleware,
  checkIsUserConfirmedMiddleware,
  authController.authUser
);

router.post('/logout', checkAccessTokenMiddleware, authController.logoutUser);

export const authRouter = router;
