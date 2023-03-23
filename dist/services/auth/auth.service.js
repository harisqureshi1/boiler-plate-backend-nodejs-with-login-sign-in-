"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const database_1 = require("../../database");
class AuthService {
    createTokenPair(tokenObject) {
        const tokensToCreate = new database_1.AccessTokenModel(tokenObject);
        return tokensToCreate.save();
    }
    async findUserByToken(findObject) {
        var _a;
        const tokenAndUser = await database_1.AccessTokenModel
            .findOne(findObject)
            .populate('userId')
            .select({ userId: 1, _id: 0 });
        return (_a = tokenAndUser === null || tokenAndUser === void 0 ? void 0 : tokenAndUser.userId) === null || _a === void 0 ? void 0 : _a.toJSON();
    }
    removeToken(removeObject) {
        return database_1.AccessTokenModel.findOneAndDelete(removeObject);
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map