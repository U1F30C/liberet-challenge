import { Model } from 'sequelize-typescript';
import { TestTypeCodes } from '../constants/test-type-codes';
export interface ITestType {
    id: number;
    name: string;
    price: string;
    active: boolean;
    testTypeCode: TestTypeCodes;
    codePrefix: string;
    releaseTimeOffset: Date;
}
export declare class TestType extends Model<TestType, Omit<ITestType, 'id'>> implements ITestType {
    id: number;
    name: string;
    price: string;
    active: boolean;
    testTypeCode: TestTypeCodes;
    codePrefix: string;
    releaseTimeOffset: Date;
}
