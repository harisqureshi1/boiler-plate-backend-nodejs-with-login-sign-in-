"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegExpEnum = void 0;
exports.RegExpEnum = {
    password: new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone: new RegExp('^[+]*[0-9]{5,20}$')
};
//# sourceMappingURL=regexp.enum.js.map