import { RequestWithUser } from 'src/authorization/types/request-with-users';
import { ApplicationEmails } from 'src/shared/email/application-emails';
import { UsersService } from 'src/users/users.service';
import { AppointmentProofOfPaymentService } from './services/appointment-proof-of-payment.service';
import { AppointmentsService } from './services/appointments.service';
export declare class AppointmentProofOfPaymentValidationController {
    private applicationEmail;
    private appointmentService;
    private userService;
    private appointmentProofOfPaymentService;
    constructor(applicationEmail: ApplicationEmails, appointmentService: AppointmentsService, userService: UsersService, appointmentProofOfPaymentService: AppointmentProofOfPaymentService);
    validateProofOfPayment(request: RequestWithUser, appointmentCode: string): Promise<void>;
    noValidateProofOfPayment(request: RequestWithUser, appointmentCode: string): Promise<void>;
}
