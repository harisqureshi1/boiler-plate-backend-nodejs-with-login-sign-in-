import { ActionEnum } from '../constants';

export interface IUserToken {
  token?: string,
  action?: ActionEnum
}

export interface IUser {
  _id: string;
  name?: string;
  login: string;
  email: string;
  password: string;
  phone?: string;
  photo?: string;
  status: string;
  tokens?: [IUserToken];
  createdAt: string;
}
