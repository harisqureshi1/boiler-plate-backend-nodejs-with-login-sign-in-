"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logService = void 0;
const database_1 = require("../../database");
class LogService {
    createLog(log) {
        const logToCreate = new database_1.LogModel(log);
        return logToCreate.save();
    }
}
exports.logService = new LogService();
//# sourceMappingURL=log.service.js.map