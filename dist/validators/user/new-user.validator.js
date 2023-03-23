"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUserValidator = void 0;
const Joi = require("joi");
const constants_1 = require("../../constants");
exports.newUserValidator = Joi.object({
    email: Joi.string().trim().regex(constants_1.RegExpEnum.email).required(),
    login: Joi.string().trim().min(3).max(50).required(),
    password: Joi.string().trim().regex(constants_1.RegExpEnum.password).required(),
    phone: Joi.string().regex(constants_1.RegExpEnum.phone).trim(),
    photo: Joi.string()
});
//# sourceMappingURL=new-user.validator.js.map