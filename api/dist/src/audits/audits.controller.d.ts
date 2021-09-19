import { PaginationWrapper } from 'src/shared/querying/querist';
import { IAudit } from './models/audit.model';
import { AuditsService } from './services/audits.service';
export declare class AuditsController {
    private readonly auditsService;
    constructor(auditsService: AuditsService);
    findWithResult(query: any): Promise<PaginationWrapper<IAudit>>;
}
