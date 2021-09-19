import { Model } from 'sequelize-typescript';
import { Municipality } from './municipality.model';
export interface ILocality {
    id: number;
    key: string;
    name: string;
    municipalityId: number;
}
export declare class Locality extends Model<Locality> implements ILocality {
    id: number;
    key: string;
    name: string;
    municipalityId: number;
    municipality: Municipality;
}
