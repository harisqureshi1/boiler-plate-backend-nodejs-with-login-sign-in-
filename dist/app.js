"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors = require("cors");
const dotEnv = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const path = require("path");
const config_1 = require("./config");
const constants_1 = require("./constants");
const routes_1 = require("./routes");
dotEnv.config();
class App {
    constructor() {
        this.app = express();
        this.configureCors = (origin, callback) => {
            const whiteList = config_1.config.ALLOWED_ORIGIN.split(';');
            if (!origin) {
                return callback(null, true);
            }
            if (!whiteList.includes(origin)) {
                return callback(new Error('Cors not allowed'), false);
            }
            return callback(null, true);
        };
        global.appRoot = path.resolve(process.cwd(), '../');
        this.app.use(morgan('dev'));
        this.app.use(helmet());
        this.app.use(cors({
            origin: this.configureCors
        }));
        this.app.use(passport.initialize());
        passport.serializeUser((user, done) => {
            done(null, user);
        });
        passport.deserializeUser((user, done) => {
            done(null, user);
        });
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.resolve(global.appRoot, 'public')));
        this.mountRoutes();
        this.setupDB();
        this.app.use(this.customErrorHandler);
    }
    setupDB() {
        mongoose.connect(config_1.config.MONGODB_URL);
        const db = mongoose.connection;
        db.on('error', console.log.bind(console, 'MONGO ERROR'));
    }
    customErrorHandler(err, _req, res, _next) {
        res
            .status(err.status || constants_1.ResponseStatusCodesEnum.SERVER)
            .json({
            message: err.message || 'Unknown error',
            code: err.code
        });
    }
    mountRoutes() {
        this.app.use('/auth', routes_1.authRouter);
        this.app.use('/users', routes_1.userRouter);
    }
}
exports.app = new App().app;
//# sourceMappingURL=app.js.map