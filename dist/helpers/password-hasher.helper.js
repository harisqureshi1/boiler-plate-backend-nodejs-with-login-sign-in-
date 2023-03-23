"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
const hashPassword = (password) => bcrypt.hash(password, 10);
exports.hashPassword = hashPassword;
const comparePassword = (password, hash) => bcrypt.compare(password, hash);
exports.comparePassword = comparePassword;
//# sourceMappingURL=password-hasher.helper.js.map