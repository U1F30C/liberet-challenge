import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/models/user.model';
import { UserIdentity } from './types/request-with-users';
export declare class AuthorizationService {
    private userService;
    constructor(userService: UsersService);
    authorizeViaBasic(email: string, password: string): Promise<any>;
    private checkUserValidity;
    authorizeViaJWT(payload: {
        id: number;
    }): UserIdentity;
    login(user: User): any;
}
