"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkConfirmTokenMiddleware = void 0;
const constants_1 = require("../../constants");
const errors_1 = require("../../errors");
// import { IRequestExtended } from '../../interfaces';
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const checkConfirmTokenMiddleware = async (req, res, next) => {
    try {
        const token = req.params.token;
        if (!token) {
            return next(new errors_1.ErrorHandler(constants_1.ResponseStatusCodesEnum.BAD_REQUEST, errors_1.customErrors.BAD_REQUEST_NO_TOKEN.message));
        }
        await (0, helpers_1.tokenVerification)(constants_1.ActionEnum.USER_REGISTER, token);
        const userByToken = await services_1.userService.findUserByActionToken(constants_1.ActionEnum.USER_REGISTER, token);
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
exports.checkConfirmTokenMiddleware = checkConfirmTokenMiddleware;
//# sourceMappingURL=check-confirm-token.middleware.js.map