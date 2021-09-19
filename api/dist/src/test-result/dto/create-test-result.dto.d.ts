import { TestTypeCodes } from 'src/appointments/constants/test-type-codes';
export declare class BaseResultData {
    type: TestTypeCodes;
    supervisorName: string;
    supervisorData: string;
    technique: string;
    sampleType: string;
}
export declare class PCRResult extends BaseResultData {
    type: TestTypeCodes.PCR;
    RP: string;
    N1: string;
    N2: string;
    N3: string;
    isPositive: boolean;
}
export declare class AntigenResult extends BaseResultData {
    type: TestTypeCodes.Antigen;
    isPositive: boolean;
}
export declare class AntibodiesResult extends BaseResultData {
    type: TestTypeCodes.Antigen;
    IgM: boolean;
    IgC: boolean;
    isPositive: boolean;
}
export declare class ResultDTO {
    testCode: string;
    resultData: PCRResult | AntigenResult | AntibodiesResult;
    comments: string;
}
export declare class CreateTestResultDto {
    results: ResultDTO[];
}
