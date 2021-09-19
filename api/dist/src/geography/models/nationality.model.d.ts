import { Model } from 'sequelize-typescript';
import { Country } from './country.model';
export interface INationality {
    id: number;
    countryId: number;
    name: string;
}
export declare class Nationality extends Model<Nationality, INationality> implements INationality {
    id: number;
    countryId: number;
    name: string;
    country: Country;
}
