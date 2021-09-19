import { IBillingData } from '../entities/billing-data.model';
export declare class BillingDataDTO implements IBillingData {
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
}
