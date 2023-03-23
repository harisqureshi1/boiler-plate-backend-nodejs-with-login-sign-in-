import { Document, Model, model, Schema } from 'mongoose';
import { IUser } from '../../interfaces';
import { TableNamesEnum, UserStatusEnum } from '../../constants';

export type UserType = IUser & Document

const tokenSubModel = {
  token: String,
  action: String
};

export const UserSchema = new Schema<IUser>({
  login: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  photo: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: true,
    default: UserStatusEnum.PENDING
  },
  tokens: [tokenSubModel]
},{
  timestamps: true
});

export const UserModel: Model<UserType> = model<UserType>(TableNamesEnum.USER, UserSchema);
