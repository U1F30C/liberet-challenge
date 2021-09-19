import { AuthorizationService } from '../authorization.service';
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthorizationService);
    validate(payload: {
        id: number;
    }): Promise<import("../types/request-with-users").UserIdentity>;
}
export {};
