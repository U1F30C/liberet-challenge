import { Model } from 'sequelize-typescript';
import { Appointment } from 'src/appointments/entities/appointment.model';
import { AntibodiesResult, AntigenResult, PCRResult } from '../dto/create-test-result.dto';
export interface ITestResult {
    testCode: string;
    resultData: any;
    comments: string;
}
export declare class TestResult extends Model<TestResult, ITestResult> implements ITestResult {
    id: number;
    testCode: string;
    resultData: PCRResult | AntigenResult | AntibodiesResult;
    comments: string;
    discarded: boolean;
    ready: boolean;
    sent: boolean;
    appointment: Appointment;
}
