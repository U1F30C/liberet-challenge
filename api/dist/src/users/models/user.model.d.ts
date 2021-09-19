import { Model } from "sequelize-typescript";
export interface IUser {
    id: number;
    name: string;
    lastName: string;
    email: string;
}
export declare class User extends Model<User> implements IUser {
    id: number;
    name: string;
    lastName: string;
    email: string;
}
