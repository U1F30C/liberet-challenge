import { ModelCtor, Sequelize } from 'sequelize-typescript';
import { Appointment } from 'src/appointments/entities/appointment.model';
import { AppointmentsService } from 'src/appointments/services/appointments.service';
import { BaseService } from 'src/shared/base/base.service';
import { Querist } from 'src/shared/querying/querist';
import { CreateTestResultDto } from './dto/create-test-result.dto';
import { ITestResult, TestResult } from './entities/test-result.model';
export declare class TestResultService extends BaseService<TestResult, ITestResult> {
    private readonly sequelizeInstance;
    private appointmentModel;
    private appointmentService;
    constructor(testResultModel: ModelCtor<TestResult>, querist: Querist<TestResult>, sequelizeInstance: Sequelize, appointmentModel: ModelCtor<Appointment>, appointmentService: AppointmentsService);
    bulkRegisterResults(createTestResultDto: CreateTestResultDto): any;
    private getResultValidateItExists;
    markAsReady(testCode: string): any;
    private validateResultIsInStatePendigResults;
    markAsDiscarded(testCode: string): any;
}
