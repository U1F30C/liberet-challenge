import { AppointmentStates } from '../constants/appointment-states';
import { Model } from 'sequelize-typescript';
import { Client, IClient } from 'src/clients/models/client.model';
import { IMinor } from 'src/clients/models/minor.model';
import { TestResult } from 'src/test-result/entities/test-result.model';
import { IPayment, Payment } from './payment.model';
import { ITestType, TestType } from './test-type.model';
export interface IAppointment {
    clientId: number;
    code: string;
    numberTest?: number;
    date: Date;
    batch?: string;
    testType?: ITestType;
    testTypeId: number;
    isForTraveling: boolean;
    receptionTime?: Date;
    state: AppointmentStates;
    comment?: string;
    minorId?: number;
    client?: IClient;
    minor?: IMinor;
    payment?: IPayment;
    previousAppointment: string;
    dateOnly: string;
}
export declare class Appointment extends Model<IAppointment> implements IAppointment {
    clientId: number;
    code: string;
    numberTest: number;
    date: Date;
    batch: string;
    isForTraveling: boolean;
    receptionTime?: Date;
    state: AppointmentStates;
    comment: string;
    minorId: number;
    testTypeId: number;
    previousAppointment: string;
    dateOnly: string;
    testType: TestType;
    results: TestResult[];
    client?: Client;
    minor?: IMinor;
    payment?: Payment;
}
