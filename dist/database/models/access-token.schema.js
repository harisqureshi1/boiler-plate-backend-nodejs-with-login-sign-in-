"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenModel = exports.AccessTokenSchema = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../constants");
exports.AccessTokenSchema = new mongoose_1.Schema({
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        ref: constants_1.TableNamesEnum.USER
    }
}, {
    timestamps: true
});
exports.AccessTokenModel = (0, mongoose_1.model)(constants_1.TableNamesEnum.ACCESS_TOKEN, exports.AccessTokenSchema);
//# sourceMappingURL=access-token.schema.js.map