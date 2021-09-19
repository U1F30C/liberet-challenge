import { Transaction } from 'sequelize/types';
import { IAppointment } from '../entities/appointment.model';
import { Payment } from '../entities/payment.model';
export declare class AppointmentPaymentInformationService {
    private paymentModel;
    constructor(paymentModel: typeof Payment);
    isAlreadyPayed(appointment: IAppointment, transaction?: Transaction): Promise<boolean>;
}
