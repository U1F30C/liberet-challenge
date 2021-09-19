import { Sexes } from 'src/constants/sexes';
import { IMinor } from '../models/minor.model';
export declare class MinorDTO implements IMinor {
    id: number;
    clientId: number;
    name: string;
    lastName: string;
    mothersLastName: string;
    curp?: string;
    sex: Sexes;
    birthDate: Date;
    passport: string;
    fullName: string;
}
