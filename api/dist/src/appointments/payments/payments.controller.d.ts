import { PaymentsService } from './payments-service';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    getPaymentDocument(appointmentCode: string, res: any): Promise<void>;
}
