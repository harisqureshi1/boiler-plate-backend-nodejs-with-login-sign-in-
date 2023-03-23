"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsUserValidMiddleware = void 0;
const Joi = require("joi");
const validators_1 = require("../../validators");
const checkIsUserValidMiddleware = (req, res, next) => {
    const { error } = Joi.validate(req.body, validators_1.newUserValidator);
    if (error) {
        return next(new Error(error.details[0].message));
    }
    next();
};
exports.checkIsUserValidMiddleware = checkIsUserValidMiddleware;
//# sourceMappingURL=check-is-user-valid.middleware.js.map