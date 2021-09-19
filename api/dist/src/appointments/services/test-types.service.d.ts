import { BaseService } from 'src/shared/base/base.service';
import { Querist } from 'src/shared/querying/querist';
import { ITestType, TestType } from '../entities/test-type.model';
export declare class TestTypesService extends BaseService<TestType, ITestType> {
    constructor(testTypeModel: typeof TestType, querist: Querist<TestType>);
}
