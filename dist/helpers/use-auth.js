"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = void 0;
const passport = require("passport");
const constants_1 = require("../constants");
const useAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user) => {
        try {
            const token = req.get(constants_1.RequestHeadersEnum.AUTHORIZATION);
            if (error || !user || token !== user.token) {
                return res.status(constants_1.ResponseStatusCodesEnum.UNAUTHORIZED).json({
                    status: 'error',
                    code: constants_1.ResponseStatusCodesEnum.UNAUTHORIZED,
                    message: 'Not authorized'
                });
            }
            req.user = user;
            next();
        }
        catch (error) {
            return res.status(constants_1.ResponseStatusCodesEnum.BAD_REQUEST).json({
                status: 'error',
                code: constants_1.ResponseStatusCodesEnum.BAD_REQUEST,
                message: 'Invalid request body / Token not provided'
            });
        }
    })(req, res, next);
};
exports.useAuth = useAuth;
//# sourceMappingURL=use-auth.js.map