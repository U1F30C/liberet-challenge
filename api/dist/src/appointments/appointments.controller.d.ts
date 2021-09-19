import { RequestWithUser } from 'src/authorization/types/request-with-users';
import { PaginationWrapper } from 'src/shared/querying/querist';
import { AppointmentInsertionDTO } from './dto/appointment-insertion.dto';
import { AppointmentRescheduleDTO } from './dto/appointment-reschedule.dto';
import { AppointmentDTO } from './dto/appointment.dto';
import { Appointment } from './entities/appointment.model';
import { AppointmentCancelationService as AppointmentCancellationService } from './services/appointment-cancellation.service';
import { AppointmentCreationService } from './services/appointment-creation.service';
import { AppointmentRescheduleService } from './services/appointment-reschedule.service';
import { AppointmentsService } from './services/appointments.service';
export declare class AppointmentsController {
    private readonly appointmentsService;
    private readonly appointmentCreationService;
    private readonly appointmentCancellationService;
    private readonly appointmentRescheduleService;
    constructor(appointmentsService: AppointmentsService, appointmentCreationService: AppointmentCreationService, appointmentCancellationService: AppointmentCancellationService, appointmentRescheduleService: AppointmentRescheduleService);
    create(appointment: AppointmentInsertionDTO, request: RequestWithUser): Promise<any>;
    validateAppointment(appointment: AppointmentInsertionDTO, request: RequestWithUser): Promise<void>;
    cancelAppointment(appointmentCode: string, request: RequestWithUser): Promise<import("./dto/appointment-cancellation-result.dto").AppointmentCancellationResultDTO>;
    rescheduleAppointment(code: string, request: RequestWithUser, rescheduleModel: AppointmentRescheduleDTO): Promise<any>;
    findAll(query: any): Promise<PaginationWrapper<Appointment>>;
    findWithResult(query: any): Promise<PaginationWrapper<AppointmentDTO>>;
    findForFinanceUser(query: any): Promise<PaginationWrapper<Appointment>>;
    findOneByCode(code: string): Promise<any>;
    findOneByCodeExpand(code: string): Promise<any>;
}
