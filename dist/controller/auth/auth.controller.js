"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const constants_1 = require("../../constants");
const errors_1 = require("../../errors");
const helpers_1 = require("../../helpers");
const services_1 = require("../../services");
const jwt = require("jsonwebtoken");
const config_1 = require("../../config");
class AuthController {
    async authUser(req, res, next) {
        try {
            const { _id, password, login, email, photo = '' } = req.user;
            console.log(password);
            const authInfo = req.body;
            console.log(authInfo.password);
            const isPasswordEquals = await (0, helpers_1.comparePassword)(authInfo.password, password);
            if (!isPasswordEquals) {
                return next(new errors_1.ErrorHandler(constants_1.ResponseStatusCodesEnum.NOT_FOUND, errors_1.customErrors.NOT_FOUND.message));
            }
            const { access_token, refresh_token } = (0, helpers_1.tokenGenerator)(constants_1.ActionEnum.USER_AUTH);
            await services_1.authService.createTokenPair({
                accessToken: access_token,
                refreshToken: refresh_token,
                userId: _id
            });
            res.json({ access_token, refresh_token, _id, login, email, photo });
        }
        catch (e) {
            return next(e);
        }
    }
    async logoutUser(req, res, next) {
        const accessToken = req.get(constants_1.RequestHeadersEnum.AUTHORIZATION);
        await services_1.authService.removeToken({ accessToken });
        res.sendStatus(constants_1.ResponseStatusCodesEnum.NO_CONTENT);
    }
    async checkEmail(req, res, next) {
        const { email } = req.body;
        const found = await services_1.userService.findOneByParams({ email }) ? true : false;
        res.json({ found });
    }
    verifyAuth(req, res, next) {
        try {
            let decoded = null;
            let accessToken = req.get(constants_1.RequestHeadersEnum.AUTHORIZATION);
            if (accessToken === null || accessToken === void 0 ? void 0 : accessToken.includes('Bearer')) {
                accessToken = accessToken.split(' ')[1];
            }
            const JWT_SECRET = config_1.config.JWT_SECRET;
            if (accessToken) {
                decoded = jwt.verify(accessToken, JWT_SECRET);
            }
            if (decoded) {
                next();
            }
            else {
                res
                    .status(401)
                    .json({ err: 'You need to be logged in to access this data' });
            }
        }
        catch (error) {
            console.log('auth error: ', error);
            next({
                message: 'Auth failed',
                status: 401
            });
        }
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map