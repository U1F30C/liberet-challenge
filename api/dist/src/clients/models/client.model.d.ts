import { Model } from 'sequelize-typescript';
import { Country } from 'src/geography/models/country.model';
import { Nationality } from 'src/geography/models/nationality.model';
import { IUser, User } from 'src/users/models/user.model';
import { Sexes } from 'src/constants/sexes';
import { Address, IAddress } from './address.model';
import { BillingData } from 'src/appointments/entities/billing-data.model';
import { Appointment, IAppointment } from 'src/appointments/entities/appointment.model';
export interface IClient {
    userId: number;
    birthDate: Date | string;
    sex: Sexes;
    phone: string;
    occupation: string;
    curp: string;
    nationalityId: number;
    originCountryId: number;
    address: IAddress;
    user?: IUser;
    passport?: string;
    appointments?: IAppointment[];
}
export declare class Client extends Model<Client> implements IClient {
    userId: number;
    birthDate: string | Date;
    sex: Sexes;
    phone: string;
    occupation: string;
    curp: string;
    nationalityId: number;
    originCountryId: number;
    passport: string;
    appointments: Appointment[];
    address: Address;
    nationality: Nationality;
    user: User;
    originCountry: Country;
    billingData: BillingData[];
}
