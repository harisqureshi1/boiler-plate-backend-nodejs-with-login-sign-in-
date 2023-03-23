import * as cors from 'cors';
import * as dotEnv from 'dotenv';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as path from 'path';
import { config } from './config';
import { ResponseStatusCodesEnum } from './constants';
import { IUser } from './interfaces';
import { authRouter,
  userRouter } from './routes';

dotEnv.config();

class App {
  public readonly app: express.Application = express();

  constructor() {
    (global as any).appRoot = path.resolve(process.cwd(), '../');

    this.app.use(morgan('dev'));
    this.app.use(helmet());
    this.app.use(cors( {
      origin: this.configureCors
    }));

    this.app.use(passport.initialize());
    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser((user, done) => {
      done(null, user as IUser);
    });

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.resolve((global as any).appRoot, 'public')));

    this.mountRoutes();
    this.setupDB();

    this.app.use(this.customErrorHandler);

  }

  private setupDB(): void {
    mongoose.connect(config.MONGODB_URL);

    const db = mongoose.connection;
    db.on('error', console.log.bind(console, 'MONGO ERROR'));
  }

  private customErrorHandler(err: any, _req: Request, res: Response, _next: NextFunction): void {
    res
      .status(err.status || ResponseStatusCodesEnum.SERVER)
      .json({
        message: err.message || 'Unknown error',
        code: err.code
      });
  }

  private configureCors = (origin: any, callback: any) => {
    const whiteList = config.ALLOWED_ORIGIN.split(';');

    if (!origin){
      return callback(null, true);
    }

    if (!whiteList.includes(origin)){
      return callback(new Error('Cors not allowed'), false);
    }

    return callback(null, true);
  }

  private mountRoutes(): void {
    this.app.use('/auth', authRouter);
    this.app.use('/users', userRouter);
  }
}

export const app = new App().app;
