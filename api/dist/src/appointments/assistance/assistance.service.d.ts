import { Sequelize, Transaction } from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { BaseService } from 'src/shared/base/base.service';
import { OdataQueryParams, Querist } from 'src/shared/querying/querist';
import { Appointment, IAppointment } from '../entities/appointment.model';
import { Consecutive } from '../entities/consecutive.model';
import { AppointmentsService } from '../services/appointments.service';
export declare class AssistanceService extends BaseService<Appointment, IAppointment> {
    private appointmentModel;
    private readonly sequelizeInstance;
    private consecutiveModel;
    private appointmentService;
    constructor(appointmentModel: ModelCtor<Appointment>, querist: Querist<Appointment>, sequelizeInstance: Sequelize, consecutiveModel: ModelCtor<Consecutive>, appointmentService: AppointmentsService);
    findAppointmentsDay(query: OdataQueryParams): Promise<import("../../shared/querying/querist").PaginationWrapper<any>>;
    findWithMinor(codeTest: string): Promise<Appointment>;
    markNonAssistance(testCode: string): Promise<any>;
    markAssistance(testCode: string): Promise<any>;
    assignNewNumber(testCode: string, transaction: Transaction): Promise<void>;
    private getCurrentDay;
}
