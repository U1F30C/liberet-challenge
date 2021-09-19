import { Model } from 'sequelize-typescript';
import { Municipality } from 'src/geography/models/municipality.model';
import { State } from 'src/geography/models/state.model';
import { Client } from './client.model';
export interface IAddress {
    clientId: number;
    municipalityId: number;
    zipCode: number;
    neighborhood?: string;
    street?: string;
    number?: string;
    internalNumber?: string;
    stateId: number;
}
export declare class Address extends Model<Address> implements IAddress {
    clientId: number;
    municipalityId: number;
    zipCode: number;
    neighborhood?: string;
    street?: string;
    number?: string;
    internalNumber?: string;
    stateId: number;
    client: Client;
    municipality: Municipality;
    state: State;
}
