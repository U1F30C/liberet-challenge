import { Model } from "sequelize-typescript";
export declare enum AuditType {
    userEdit = "Edici\u00F3n de colaborador",
    userDelete = "Eliminar colaborador",
    userAdd = "Nuevo colaborador",
    scheduleEdit = "Edici\u00F3n de horarios",
    calendarEdit = "Edici\u00F3n de dias laborables",
    testReception = "Recepcion de muestra",
    noShowAppointment = "Inasistencia a cita",
    loadResults = "Cargar resultados de muestra",
    validatePayment = "Pago v\u00E1lidado"
}
export interface IAudit {
    id_action: number;
    user_id: number;
    type: AuditType;
    previous_value: string;
    new_value: string;
    additional_data?: JSON;
    createdAt: Date | String;
}
export declare class Audits extends Model<IAudit> implements IAudit {
    id_action: number;
    user_id: number;
    type: AuditType;
    previous_value: string;
    new_value: string;
    additional_data: JSON;
    createdAt: Date | String;
}
