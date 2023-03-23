"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidator = void 0;
const Joi = require("joi");
const constants_1 = require("../../constants");
exports.emailValidator = Joi.object({
    email: Joi.string().trim().regex(constants_1.RegExpEnum.email).required()
});
//# sourceMappingURL=email.validator.js.map