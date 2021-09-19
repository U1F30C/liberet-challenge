import { TestResult } from 'src/test-result/entities/test-result.model';
import { TestTypeCodes } from '../constants/test-type-codes';
export interface AppointmentDTO {
    code: string;
    testType: TestTypeCodes;
    result?: TestResult;
}
