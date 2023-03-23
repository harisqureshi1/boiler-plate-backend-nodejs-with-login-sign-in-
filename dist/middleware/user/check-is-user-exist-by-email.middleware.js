"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsUserExistByEmailMiddleware = void 0;
const services_1 = require("../../services");
const errors_1 = require("../../errors");
const constants_1 = require("../../constants");
// import { IRequestExtended } from '../../interfaces';
const checkIsUserExistByEmailMiddleware = async (req, res, next) => {
    const { email } = req.body;
    const userByEmail = await services_1.userService.findOneByParams({ email });
    if (!userByEmail) {
        return next(new errors_1.ErrorHandler(constants_1.ResponseStatusCodesEnum.NOT_FOUND, errors_1.customErrors.NOT_FOUND.message));
    }
    req.user = userByEmail;
    next();
};
exports.checkIsUserExistByEmailMiddleware = checkIsUserExistByEmailMiddleware;
//# sourceMappingURL=check-is-user-exist-by-email.middleware.js.map