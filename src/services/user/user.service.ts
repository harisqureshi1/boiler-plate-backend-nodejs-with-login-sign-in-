import { Types } from 'mongoose';
import { UserModel } from '../../database';
import { IUser, IUserToken } from '../../interfaces';
import { ActionEnum } from '../../constants';

class UserService {
  createUser(user: Partial<IUser>): Promise<IUser>{
    const userToCreate = new UserModel(user);

    return userToCreate.save();
  }

  addActionToken(userId: string, tokenObject: IUserToken): Promise<IUser> {
    return UserModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      {
        $push: {
          tokens: tokenObject
        }
      }
    ) as unknown as Promise<IUser>;
  }

  updateUserByParams(params: Partial<IUser>, update: Partial<IUser>): Promise<IUser> {
    return UserModel.updateOne(params, update, {new: true}) as unknown as Promise<IUser>;
  }

  findOneByParams(findObject: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findOne(findObject) as unknown as Promise<IUser | null>;
  }

  findUserByActionToken(action: ActionEnum, token: string): Promise<IUser | null> {
    return UserModel.findOne({
      $and: [
        { 'tokens.action': action },
        { 'tokens.token': token }
      ]
    }) as unknown as Promise<IUser | null>;
  }
}

export const userService = new UserService();
