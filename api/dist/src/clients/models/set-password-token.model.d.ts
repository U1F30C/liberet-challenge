import { Model } from 'sequelize-typescript';
export interface ISetPasswordToken {
    id?: number;
    userId: number;
    token: string;
    validUntil: Date | string;
    isValid: boolean;
    createdAt?: Date | string;
}
export declare class SetPasswordToken extends Model<SetPasswordToken, ISetPasswordToken> implements ISetPasswordToken {
    id: number;
    token: string;
    userId: number;
    isValid: boolean;
    validUntil: Date | string;
    createdAt: any;
}
