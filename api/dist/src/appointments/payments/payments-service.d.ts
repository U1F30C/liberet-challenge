import { ModelCtor } from 'sequelize-typescript';
import { BaseService } from 'src/shared/base/base.service';
import { PdfService } from 'src/shared/pdf/pdf.service';
import { Querist } from 'src/shared/querying/querist';
import { Appointment } from '../entities/appointment.model';
import { IPayment, Payment } from '../entities/payment.model';
export declare class PaymentsService extends BaseService<Payment, IPayment> {
    private appointmentModel;
    private pdfService;
    constructor(testTypeModel: ModelCtor<Payment>, querist: Querist<Payment>, appointmentModel: ModelCtor<Appointment>, pdfService: PdfService);
    private getAppointmentForPaymentInfo;
    private formatAmountWithCurrency;
    getAppointmentCost(appointment: Appointment): Promise<{
        testPrice: string;
        discountPercentage: number;
        vatRate: number;
        vatAmount: string;
        discountAmount: string;
        subtotal: string;
        total: string;
    }>;
    getPaymentDocument(appointmentCode: string): Promise<any>;
    private getPaymentDocumentData;
}
