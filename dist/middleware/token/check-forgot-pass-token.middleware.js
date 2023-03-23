"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForgotPassTokenMiddleware = void 0;
const constants_1 = require("../../constants");
const errors_1 = require("../../errors");
const services_1 = require("../../services");
const helpers_1 = require("../../helpers");
const checkForgotPassTokenMiddleware = async (req, res, next) => {
    try {
        const token = req.get(constants_1.RequestHeadersEnum.AUTHORIZATION);
        if (!token) {
            return next(new errors_1.ErrorHandler(constants_1.ResponseStatusCodesEnum.BAD_REQUEST, errors_1.customErrors.BAD_REQUEST_NO_TOKEN.message));
        }
        await (0, helpers_1.tokenVerification)(constants_1.ActionEnum.FORGOT_PASSWORD, token);
        const userByToken = await services_1.userService.findUserByActionToken(constants_1.ActionEnum.FORGOT_PASSWORD, token);
        if (!userByToken) {
            return next(new errors_1.ErrorHandler(constants_1.ResponseStatusCodesEnum.NOT_FOUND, errors_1.customErrors.NOT_FOUND.message));
        }
        req.user = userByToken;
        next();
    }
    catch (e) {
        next(e);
    }
};
exports.checkForgotPassTokenMiddleware = checkForgotPassTokenMiddleware;
//# sourceMappingURL=check-forgot-pass-token.middleware.js.map