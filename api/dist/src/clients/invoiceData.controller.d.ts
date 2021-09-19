import { InvoiceDataService } from './services/invoiceData.service';
import { BillingData, IBillingData } from '../appointments/entities/billing-data.model';
import { BillingDataDTO } from '../appointments/dto/billingData.dto';
export declare class InvoiceDataController {
    private readonly invoiceDataService;
    constructor(invoiceDataService: InvoiceDataService);
    create(invoiceData: IBillingData): Promise<BillingData | "AlreadyExistingInvoiceData" | {
        validationRequired: boolean;
        invoiceData: string | BillingData;
    }>;
    findOneByClient(clientId: string): Promise<BillingData[]>;
    update(id: number, invoiceData: Partial<BillingDataDTO>): Promise<any>;
    remove(id: string): void;
}
