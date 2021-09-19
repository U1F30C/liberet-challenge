import { Model } from 'sequelize-typescript';
export interface ICountry {
    id: number;
    name: string;
}
export declare class Country extends Model<Country, ICountry> implements ICountry {
    id: number;
    name: string;
}
