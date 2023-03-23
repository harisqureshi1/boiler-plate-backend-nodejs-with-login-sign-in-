"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenGenerator = void 0;
const jwt = require("jsonwebtoken");
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const config_1 = require("../config");
const tokenGenerator = (action) => {
    let access_token = '';
    let refresh_token = '';
    switch (action) {
        case constants_1.ActionEnum.USER_AUTH:
            access_token = jwt.sign({}, config_1.config.JWT_SECRET, { expiresIn: '1d' });
            refresh_token = jwt.sign({}, config_1.config.JWT_REFRESH_SECRET, { expiresIn: '1d' });
            break;
        case constants_1.ActionEnum.USER_REGISTER:
            access_token = jwt.sign({}, config_1.config.JWT_CONFIRM_EMAIL_SECRET, { expiresIn: config_1.config.JWT_CONFIRM_EMAIL_LIFETIME });
            break;
        case constants_1.ActionEnum.FORGOT_PASSWORD:
            access_token = jwt.sign({}, config_1.config.JWT_PASS_RESET_SECRET, { expiresIn: config_1.config.JWT_PASS_RESET_LIFETIME });
            break;
        default:
            throw new errors_1.ErrorHandler(constants_1.ResponseStatusCodesEnum.SERVER, 'wrong Action type');
    }
    return {
        access_token,
        refresh_token
    };
};
exports.tokenGenerator = tokenGenerator;
//# sourceMappingURL=token-generator.helper.js.map