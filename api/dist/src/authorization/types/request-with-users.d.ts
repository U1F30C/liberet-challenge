import { Request } from 'express';
export interface UserIdentity {
    id: number;
}
export declare type RequestWithUser = Request & {
    user: UserIdentity;
};
