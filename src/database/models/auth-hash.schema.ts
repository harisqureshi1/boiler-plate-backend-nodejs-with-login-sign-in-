import { Document, Model, model, Schema } from 'mongoose';
import { IAuthHash } from '../../interfaces';
import { TableNamesEnum } from '../../constants';

export type AuthHashType = IAuthHash & Document

export const AuthHashSchema = new Schema<IAuthHash>({
  authHash: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    ref: TableNamesEnum.USER
  }
},{
  timestamps: true
});

export const AuthHashModel: Model<AuthHashType> = model<AuthHashType>('AuthHash', AuthHashSchema);
