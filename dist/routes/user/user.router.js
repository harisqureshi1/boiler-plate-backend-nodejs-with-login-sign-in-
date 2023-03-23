"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../../controller");
const middleware_1 = require("../../middleware");
const router = (0, express_1.Router)();
router.get('/', middleware_1.checkAccessTokenMiddleware, controller_1.userController.getUser);
router.post('/', middleware_1.checkIsUserValidMiddleware, middleware_1.checkIsEmailExistsMiddleware, controller_1.userController.createUser);
router.get('/confirm/:token', middleware_1.checkConfirmTokenMiddleware, controller_1.userController.confirmUser);
router.post('/password/forgot', middleware_1.emailValidatorMiddleware, middleware_1.checkIsUserExistByEmailMiddleware, controller_1.userController.forgotPassword);
router.post('/password/reset', middleware_1.singlePasswordValidatorMiddleware, middleware_1.checkForgotPassTokenMiddleware, controller_1.userController.setForgotPass);
router.post('/settings/update', middleware_1.checkIsUserExistByEmailMiddleware, controller_1.userController.updateUserSettings);
exports.userRouter = router;
//# sourceMappingURL=user.router.js.map