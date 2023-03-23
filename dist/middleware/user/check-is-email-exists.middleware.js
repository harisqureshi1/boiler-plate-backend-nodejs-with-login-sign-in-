"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsEmailExistsMiddleware = void 0;
const constants_1 = require("../../constants");
const errors_1 = require("../../errors");
const services_1 = require("../../services");
const checkIsEmailExistsMiddleware = async (req, res, next) => {
    const { email } = req.body;
    const userByEmail = await services_1.userService.findOneByParams({ email });
    if (userByEmail) {
        return next(new errors_1.ErrorHandler(constants_1.ResponseStatusCodesEnum.BAD_REQUEST, errors_1.customErrors.BAD_REQUEST_USER_REGISTERED.message, errors_1.customErrors.BAD_REQUEST_USER_REGISTERED.code));
    }
    next();
};
exports.checkIsEmailExistsMiddleware = checkIsEmailExistsMiddleware;
//# sourceMappingURL=check-is-email-exists.middleware.js.map