"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHashModel = exports.AuthHashSchema = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../constants");
exports.AuthHashSchema = new mongoose_1.Schema({
    authHash: {
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
exports.AuthHashModel = (0, mongoose_1.model)('AuthHash', exports.AuthHashSchema);
//# sourceMappingURL=auth-hash.schema.js.map