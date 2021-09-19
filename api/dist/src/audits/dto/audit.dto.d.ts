import { AuditType, IAudit } from '../models/audit.model';
export declare class AuditDTO implements IAudit {
    id_action: number;
    user_id: number;
    type: AuditType;
    previous_value: string;
    new_value: string;
    additional_data?: JSON;
    createdAt: string;
}
