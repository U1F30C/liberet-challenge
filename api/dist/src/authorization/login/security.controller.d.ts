import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
export declare class SecurityController {
    private jwtService;
    constructor(jwtService: JwtService);
    setCookie(req: Request, response: Response, token: any): Promise<any>;
}
