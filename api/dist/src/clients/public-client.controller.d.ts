import { UsersService } from 'src/users/users.service';
import { ClientRegistrationDTO } from './dtos/client-registration-dto';
import { VerificationEmailModel } from './models/verification-email-model';
import { ClientUserRegistrationService } from './services/client-user-registration.service';
import { ClientService } from './services/clients.service';
import { PasswordTokenService as SetPasswordTokenService } from './services/set-password-token.service';
export interface SetPasswordModel {
    password: string;
    token: string;
}
export declare class PublicClientController {
    private clientService;
    private clientUserRegistrationService;
    private userService;
    private setPasswordTokenService;
    constructor(clientService: ClientService, clientUserRegistrationService: ClientUserRegistrationService, userService: UsersService, setPasswordTokenService: SetPasswordTokenService);
    create(registerModel: ClientRegistrationDTO): Promise<{
        validationRequired: boolean;
        client: any;
    }>;
    sendVerificationEmail(verificationEmail: VerificationEmailModel): Promise<void>;
    verifyToken(token: string): Promise<{
        isValid: boolean;
    }>;
    setPassword(setPasswordMode: SetPasswordModel): Promise<void>;
}
