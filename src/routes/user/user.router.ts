import { Router } from 'express';
import { userController } from '../../controller';
import {
  checkAccessTokenMiddleware,
  checkConfirmTokenMiddleware,
  checkForgotPassTokenMiddleware,
  checkIsEmailExistsMiddleware,
  checkIsUserExistByEmailMiddleware,
  checkIsUserValidMiddleware,
  emailValidatorMiddleware,
  singlePasswordValidatorMiddleware
} from '../../middleware';

const router = Router();

router.get('/', checkAccessTokenMiddleware, userController.getUser);
router.post('/', checkIsUserValidMiddleware, checkIsEmailExistsMiddleware, userController.createUser);
router.get('/confirm/:token', checkConfirmTokenMiddleware, userController.confirmUser);
router.post(
  '/password/forgot',
  emailValidatorMiddleware,
  checkIsUserExistByEmailMiddleware,
  userController.forgotPassword
);
router.post(
  '/password/reset',
  singlePasswordValidatorMiddleware,
  checkForgotPassTokenMiddleware,
  userController.setForgotPass
);
router.post(
  '/settings/update',
  checkIsUserExistByEmailMiddleware,
  userController.updateUserSettings
);

export const userRouter = router;
