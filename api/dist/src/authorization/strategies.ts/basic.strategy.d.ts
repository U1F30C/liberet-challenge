import { AuthorizationService } from '../authorization.service';
declare const BasicAuthStrategy_base: any;
export declare class BasicAuthStrategy extends BasicAuthStrategy_base {
    private authService;
    constructor(authService: AuthorizationService);
    validate(email: string, password: string): Promise<any>;
}
export {};
