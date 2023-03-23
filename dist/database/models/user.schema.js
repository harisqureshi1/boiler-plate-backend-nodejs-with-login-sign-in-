"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../constants");
const tokenSubModel = {
    token: String,
    action: String
};
exports.UserSchema = new mongoose_1.Schema({
    login: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    photo: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: constants_1.UserStatusEnum.PENDING
    },
    tokens: [tokenSubModel]
}, {
    timestamps: true
});
exports.UserModel = (0, mongoose_1.model)(constants_1.TableNamesEnum.USER, exports.UserSchema);
//# sourceMappingURL=user.schema.js.map