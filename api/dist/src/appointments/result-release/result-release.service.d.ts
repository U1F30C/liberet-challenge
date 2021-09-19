import { Sequelize } from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { ApplicationEmails } from 'src/shared/email/application-emails';
import { TimeUtilsService } from 'src/shared/time/time-utils.service';
import { TestResult } from 'src/test-result/entities/test-result.model';
import { Appointment } from '../entities/appointment.model';
export declare class ResultReleaseService {
    private appointmentModel;
    private testResultModel;
    private readonly sequelizeInstance;
    private applicationEmails;
    private timeUtils;
    constructor(appointmentModel: ModelCtor<Appointment>, testResultModel: ModelCtor<TestResult>, sequelizeInstance: Sequelize, applicationEmails: ApplicationEmails, timeUtils: TimeUtilsService);
    triggerResultRelease(): Promise<void>;
    releaseApplicableResults(): Promise<void>;
    sendMail(appointment: Appointment): Promise<void>;
}
