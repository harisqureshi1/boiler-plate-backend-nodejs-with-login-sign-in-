"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogModel = exports.LogSchema = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../../constants");
exports.LogSchema = new mongoose_1.Schema({
    event: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    data: mongoose_1.Schema.Types.Mixed
}, {
    timestamps: true
});
exports.LogModel = (0, mongoose_1.model)(constants_1.TableNamesEnum.LOGS, exports.LogSchema);
//# sourceMappingURL=log.schema.js.map