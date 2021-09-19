import { UsersService } from './users.service';
export declare class PublicUsersController {
    private userService;
    constructor(userService: UsersService);
    checkDuplicated(queryString: any): Promise<{
        exists: boolean;
    }>;
    checkReplacement(queryString: any): Promise<{
        valid: boolean;
    }>;
}
