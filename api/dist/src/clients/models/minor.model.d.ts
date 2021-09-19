import { Model } from 'sequelize-typescript';
import { Sexes } from 'src/constants/sexes';
export interface IMinor {
    id: number;
    clientId: number;
    name: string;
    lastName: string;
    mothersLastName: string;
    curp?: string;
    birthDate: Date;
    fullName: string;
    sex: Sexes;
    passport?: string;
}
export declare class Minor extends Model<IMinor> implements IMinor {
    id: number;
    clientId: number;
    name: string;
    lastName: string;
    mothersLastName: string;
    curp?: string;
    birthDate: Date;
    sex: Sexes;
    passport: string;
    fullName: string;
}
