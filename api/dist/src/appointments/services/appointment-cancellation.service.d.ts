import { Transaction } from 'sequelize/types';
import { UsersService } from 'src/users/users.service';
import { AppointmentCancellationResultDTO } from '../dto/appointment-cancellation-result.dto';
import { Appointment } from '../entities/appointment.model';
import { ProofOfPayment } from '../entities/file.model';
import { Payment } from '../entities/payment.model';
import { AppointmentAvailabilityService } from './appointment-availability.service';
import { AppointmentPaymentInformationService } from './appointment-payment-information.service';
export declare class AppointmentCancelationService {
    private appointmentModel;
    private paymentModel;
    private proofOfPaymentModel;
    private userService;
    private appointmentAvailabilityService;
    private appointmentPaymentInformationService;
    constructor(appointmentModel: typeof Appointment, paymentModel: typeof Payment, proofOfPaymentModel: typeof ProofOfPayment, userService: UsersService, appointmentAvailabilityService: AppointmentAvailabilityService, appointmentPaymentInformationService: AppointmentPaymentInformationService);
    cancelAppointment(appointmentCode: string, userId: number, transaction?: Transaction): Promise<AppointmentCancellationResultDTO>;
    postponeAppointment(appointmentCode: string, userId: number, transaction?: Transaction): Promise<AppointmentCancellationResultDTO>;
    private changeToInvalidStatus;
    private setNewCode;
    private updateCodePreservingForeignkeys;
    private recreate;
    private getAppointmentWithPayment;
    private performTransactionalStateChange;
    private applyChanges;
    private validateAllowedOperation;
    private isUserAbleToPerformOperation;
}
