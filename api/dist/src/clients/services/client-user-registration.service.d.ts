import { ApplicationEmails } from 'src/shared/email/application-emails';
import { IUser, User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { ClientUserRegisterDTO } from '../dtos/client-registration-dto';
import { SetPasswordModel } from '../public-client.controller';
import { PasswordTokenService } from './set-password-token.service';
export interface ClientUserRegistrationResult {
    validationRequired: boolean;
    user: User;
}
export declare class ClientUserRegistrationService {
    private userModel;
    private userService;
    private applicationEmails;
    private passwordTokenService;
    constructor(userModel: typeof User, userService: UsersService, applicationEmails: ApplicationEmails, passwordTokenService: PasswordTokenService);
    registerUser(user: ClientUserRegisterDTO): Promise<ClientUserRegistrationResult>;
    private fetchUser;
    beginVerificationProcess(user: IUser): Promise<void>;
    private sendVerificationEmail;
    private generateToken;
    setPassword(setPasswordModel: SetPasswordModel): Promise<void>;
}
