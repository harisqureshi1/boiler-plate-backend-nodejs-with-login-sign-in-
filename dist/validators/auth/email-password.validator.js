"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailPasswordValidator = void 0;
const Joi = require("joi");
const constants_1 = require("../../constants");
exports.emailPasswordValidator = Joi.object({
    email: Joi.string().trim().regex(constants_1.RegExpEnum.email).required(),
    password: Joi.string().trim().regex(constants_1.RegExpEnum.password).required()
});
//# sourceMappingURL=email-password.validator.js.map