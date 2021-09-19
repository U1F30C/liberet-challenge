import { TestTypesService } from './services/test-types.service';
export declare class TestTypeController {
    private testTypesService;
    constructor(testTypesService: TestTypesService);
    findAll(query: any): Promise<import("../shared/querying/querist").PaginationWrapper<any>>;
    findById(id: string): Promise<import("./entities/test-type.model").TestType>;
}
