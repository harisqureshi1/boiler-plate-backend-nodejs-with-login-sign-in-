"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsUserConfirmedMiddleware = void 0;
const errors_1 = require("../../errors");
const constants_1 = require("../../constants");
const checkIsUserConfirmedMiddleware = (req, res, next) => {
    const { status } = req.user;
    if (status !== constants_1.UserStatusEnum.CONFIRMED) {
        return next(new errors_1.ErrorHandler(constants_1.ResponseStatusCodesEnum.FORBIDDEN, errors_1.customErrors.FORBIDDEN_USER_NOT_CONFIRMED.message, errors_1.customErrors.FORBIDDEN_USER_NOT_CONFIRMED.code));
    }
    next();
};
exports.checkIsUserConfirmedMiddleware = checkIsUserConfirmedMiddleware;
//# sourceMappingURL=check-is-user-confirmed.middlevare.js.map