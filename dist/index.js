"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app");
const config_1 = require("./config");
const server = http.createServer(app_1.app);
server.listen(config_1.config.PORT, () => {
    console.log(`Listen port ${config_1.config.PORT}`);
});
function handle(signal) {
    console.log(`Received ${signal}. Terminating the app...`);
    server.close(() => {
        process.exit(0);
    });
}
process.on('SIGINT', handle);
process.on('SIGTERM', handle);
process.on('uncaughtException', error => {
    console.log(error);
});
process.on('unhandledRejection', error => {
    console.log(error);
});
//# sourceMappingURL=index.js.map