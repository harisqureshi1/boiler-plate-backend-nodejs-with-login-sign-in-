"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const Joi = require("joi");
const constants_1 = require("../../constants");
const errors_1 = require("../../errors");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const validators_1 = require("../../validators");
const config_1 = require("../../config");
class UserController {
    async createUser(req, res, next) {
        const user = req.body;
        console.log(user);
        user.photo = config_1.config.DEFAULT_AVATAR;
        const { error } = Joi.validate(user, validators_1.newUserValidator);
        if (error) {
            return next(new Error(error.details[0].message));
        }
        user.password = await (0, helpers_1.hashPassword)(user.password);
        const { _id } = await services_1.userService.createUser(user);
        const { access_token } = (0, helpers_1.tokenGenerator)(constants_1.ActionEnum.USER_REGISTER);
        await services_1.userService.addActionToken(_id, { action: constants_1.ActionEnum.USER_REGISTER, token: access_token });
        await services_1.logService.createLog({ event: constants_1.LogEnum.USER_REGISTERED, userId: _id });
        res.sendStatus(constants_1.ResponseStatusCodesEnum.CREATED);
    }
    async confirmUser(req, res, next) {
        const { _id, status, tokens = [] } = req.user;
        const tokenToDelete = req.get(constants_1.RequestHeadersEnum.AUTHORIZATION);
        if (status !== constants_1.UserStatusEnum.PENDING) {
            return next(new errors_1.ErrorHandler(constants_1.ResponseStatusCodesEnum.BAD_REQUEST, errors_1.customErrors.BAD_REQUEST_USER_ACTIVATED.message, errors_1.customErrors.BAD_REQUEST_USER_ACTIVATED.code));
        }
        await services_1.userService.updateUserByParams({ _id }, { status: constants_1.UserStatusEnum.CONFIRMED });
        const index = tokens.findIndex(({ action, token }) => {
            return token === tokenToDelete && action === constants_1.ActionEnum.USER_REGISTER;
        });
        if (index !== -1) {
            tokens.splice(index, 1);
            await services_1.userService.updateUserByParams({ _id }, { tokens });
        }
        await services_1.logService.createLog({ event: constants_1.LogEnum.USER_CONFIRMED, userId: _id });
        res.redirect(config_1.config.FRONTEND_URL);
    }
    async forgotPassword(req, res, next) {
        const { _id } = req.user;
        const { access_token } = (0, helpers_1.tokenGenerator)(constants_1.ActionEnum.FORGOT_PASSWORD);
        await services_1.userService.addActionToken(_id, { token: access_token, action: constants_1.ActionEnum.FORGOT_PASSWORD });
        res.end();
    }
    async setForgotPass(req, res, next) {
        const { _id, tokens = [] } = req.user;
        const { password } = req.body;
        const tokenToDelete = req.get(constants_1.RequestHeadersEnum.AUTHORIZATION);
        const hashPass = await (0, helpers_1.hashPassword)(password);
        await services_1.userService.updateUserByParams({ _id }, { password: hashPass });
        const index = tokens.findIndex(({ action, token }) => {
            return token === tokenToDelete && action === constants_1.ActionEnum.FORGOT_PASSWORD;
        });
        if (index !== -1) {
            tokens.splice(index, 1);
            await services_1.userService.updateUserByParams({ _id }, { tokens });
        }
        res.end();
    }
    async getUser(req, res, next) {
        const { _id } = req.user;
        const user = await services_1.userService.findOneByParams({ _id });
        res.json(user);
    }
    async updateUserSettings(req, res, next) {
        const { _id, password } = req.user;
        const { name, newPassword } = req.body;
        console.log('password: ', password);
        let hashPass = '';
        if (newPassword) {
            hashPass = await (0, helpers_1.hashPassword)(newPassword);
        }
        await services_1.userService.updateUserByParams({ _id }, { login: name, password: hashPass ? hashPass : password });
        res.end();
    }
}
exports.userController = new UserController();
//# sourceMappingURL=user.controller.js.map