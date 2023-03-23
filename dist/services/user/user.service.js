"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const mongoose_1 = require("mongoose");
const database_1 = require("../../database");
class UserService {
    createUser(user) {
        const userToCreate = new database_1.UserModel(user);
        return userToCreate.save();
    }
    addActionToken(userId, tokenObject) {
        return database_1.UserModel.updateOne({ _id: new mongoose_1.Types.ObjectId(userId) }, {
            $push: {
                tokens: tokenObject
            }
        });
    }
    updateUserByParams(params, update) {
        return database_1.UserModel.updateOne(params, update, { new: true });
    }
    findOneByParams(findObject) {
        return database_1.UserModel.findOne(findObject);
    }
    findUserByActionToken(action, token) {
        return database_1.UserModel.findOne({
            $and: [
                { 'tokens.action': action },
                { 'tokens.token': token }
            ]
        });
    }
}
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map