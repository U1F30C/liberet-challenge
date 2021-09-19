import { TimeUtilsService } from 'src/shared/time/time-utils.service';
import { UsersService } from 'src/users/users.service';
import { Appointment } from '../entities/appointment.model';
import { AppointmentCreationService } from './appointment-creation.service';
import { AppointmentCancelationService as AppointmentCancellationService } from './appointment-cancellation.service';
import { Payment } from '../entities/payment.model';
export declare class AppointmentRescheduleService {
    private appointmentModel;
    private paymentModel;
    private userService;
    private timeUtils;
    private appointmentCancellationService;
    private appointmentCreationService;
    constructor(appointmentModel: typeof Appointment, paymentModel: typeof Payment, userService: UsersService, timeUtils: TimeUtilsService, appointmentCancellationService: AppointmentCancellationService, appointmentCreationService: AppointmentCreationService);
    rescheduleAppointment(code: string, userId: number, newDate: Date): Promise<any>;
    private performReschedule;
    private copyAppointment;
    private validateReschedulable;
    private validateAppointmentStatus;
    private validateTimeMargin;
    private isUserAbleToReschedule;
}
