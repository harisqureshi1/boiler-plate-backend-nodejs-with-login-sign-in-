import { verify, VerifyErrors } from 'jsonwebtoken';
import { promisify } from 'util';
import { ActionEnum, ResponseStatusCodesEnum } from '../constants';
import { customErrors, ErrorHandler } from '../errors';

const verifyPromise = promisify(verify);

export const tokenVerification = async (action: ActionEnum, token: string): Promise<VerifyErrors | null> => {
  try {
    let isValid;
    switch (action) {
      case ActionEnum.USER_AUTH:
        isValid = await verifyPromise(token) as unknown as Promise<VerifyErrors | null>;
        break;

      case ActionEnum.USER_REGISTER:
        isValid = await verifyPromise(token) as unknown as Promise<VerifyErrors | null>;
        break;

      case ActionEnum.FORGOT_PASSWORD:
        isValid = await verifyPromise(token) as unknown as Promise<VerifyErrors | null>;
        break;

      default:
        throw new ErrorHandler(ResponseStatusCodesEnum.SERVER, 'wrong Action type');
    }

    return isValid;
  } catch (e) {
    throw new ErrorHandler(ResponseStatusCodesEnum.UNAUTHORIZED, customErrors.UNAUTHORIZED_BAD_TOKEN.message);
  }

};
