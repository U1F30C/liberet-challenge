import { ISetPasswordToken, SetPasswordToken } from '../models/set-password-token.model';
import { TimeUtilsService } from 'src/shared/time/time-utils.service';
export declare class PasswordTokenService {
    private setPasswordTokenModel;
    private timeUtils;
    constructor(setPasswordTokenModel: typeof SetPasswordToken, timeUtils: TimeUtilsService);
    createNewToken(userId: number): Promise<string>;
    private removePreviousTokens;
    getTokenObject(tokenString: string): Promise<any>;
    isTokenValid(token: SetPasswordToken): Promise<boolean>;
    hasExpired(token: ISetPasswordToken): Promise<boolean>;
    setTokenAsInvalid(tokenString: string): Promise<void>;
    invalidateToken(tokenId: number): Promise<void>;
}
