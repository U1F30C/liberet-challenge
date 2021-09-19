import { Response } from 'express';
import { AuthorizationService } from '../authorization.service';
export declare class LoginController {
    private authorizationService;
    constructor(authorizationService: AuthorizationService);
    login(req: any, response: Response): void;
}
