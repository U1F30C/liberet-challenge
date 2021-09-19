import { Model } from 'sequelize-typescript';
import { Client } from 'src/clients/models/client.model';
import { Municipality } from 'src/geography/models/municipality.model';
import { State } from 'src/geography/models/state.model';
import { Locality } from '../../geography/models/locality.model';
export interface IBillingData {
    id?: number;
    clientId: number;
    rfc: string;
    corporateName: string;
    email: string;
    municipalityId: number;
    zipCode: number;
    street: string;
    number: string;
    internalNumber?: string;
    stateId: number;
    localityId: number;
    neighborhood: string;
}
export declare class BillingData extends Model<BillingData> implements IBillingData {
    id: number;
    clientId: number;
    rfc: string;
    corporateName: string;
    email: string;
    municipalityId: number;
    zipCode: number;
    street: string;
    number: string;
    internalNumber: string;
    stateId: number;
    localityId: number;
    neighborhood: string;
    municipality: Municipality;
    state: State;
    client: Client;
    locality: Locality;
}
