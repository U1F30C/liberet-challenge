import { ModelCtor } from 'sequelize-typescript';
import { BaseService } from 'src/shared/base/base.service';
import { OdataQueryParams, Querist } from 'src/shared/querying/querist';
import { Audits, IAudit } from '../models/audit.model';
export declare class AuditsService extends BaseService<Audits, IAudit> {
    constructor(auditModel: ModelCtor<Audits>, querist: Querist<Audits>);
    findAllAudits(query: OdataQueryParams): Promise<import("../../shared/querying/querist").PaginationWrapper<any>>;
}
