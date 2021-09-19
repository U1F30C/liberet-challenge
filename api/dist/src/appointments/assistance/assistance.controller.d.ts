import { PaginationWrapper } from 'src/shared/querying/querist';
import { Appointment, IAppointment } from '../entities/appointment.model';
import { AssistanceService } from './assistance.service';
export declare class AssistanceController {
    private readonly assistanceService;
    constructor(assistanceService: AssistanceService);
    findAppointmentsDay(query: any): Promise<PaginationWrapper<IAppointment>>;
    findOne(id: string): Promise<Appointment>;
    markAssistance(code: string): Promise<any>;
    markNonAssistance(code: string): Promise<any>;
}
