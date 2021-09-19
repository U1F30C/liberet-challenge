import { CreateTestResultDto } from './dto/create-test-result.dto';
import { TestResultService } from './test-result.service';
export declare class TestResultController {
    private readonly testResultService;
    constructor(testResultService: TestResultService);
    saveResults(createTestResultDto: CreateTestResultDto): any;
    markAsReady(code: string): any;
    markAsDiscarded(code: string): any;
}
