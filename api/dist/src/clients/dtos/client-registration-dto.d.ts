import { Roles } from 'src/constants/roles';
import { IUser } from 'src/users/models/user.model';
import { Sexes } from 'src/constants/sexes';
import { UdgCommunityCodeTypes } from 'src/constants/udg-community-code-types';
import { IAddress } from '../models/address.model';
import { IClient } from '../models/client.model';
import { IUdgCode } from 'src/users/models/udg-codes.model';
export declare class AddressInsertionDTO implements IAddress {
    clientId: number;
    municipalityId: number;
    zipCode: number;
    neighborhood?: string;
    street?: string;
    number?: string;
    internalNumber: string;
    stateId: number;
}
export declare class ClientInsertionDTO implements IClient {
    userId: number;
    birthDate: string;
    sex: Sexes;
    phone: string;
    occupation: string;
    curp: string;
    nationalityId: number;
    originCountryId: number;
    address: AddressInsertionDTO;
}
export declare class UdgCodeInsertionDTO implements IUdgCode {
    userId: number;
    code: string;
    type: UdgCommunityCodeTypes;
}
export declare class ClientUserRegisterDTO implements IUser {
    id: number;
    name: string;
    lastName: string;
    email: string;
    role: Roles;
    udgCode?: UdgCodeInsertionDTO;
}
export declare class ClientRegistrationDTO {
    client: ClientInsertionDTO;
    user: ClientUserRegisterDTO;
}
