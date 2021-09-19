import { BaseService } from 'src/shared/base/base.service';
import { Querist } from 'src/shared/querying/querist';
import { BillingData, IBillingData } from '../../appointments/entities/billing-data.model';
import { BillingDataDTO } from '../../appointments/dto/billingData.dto';
export declare class InvoiceDataService extends BaseService<BillingData, IBillingData> {
    private billingDataModel;
    constructor(billingDataModel: typeof BillingData, querist: Querist<BillingData>);
    createInvoiceData(invoiceData: IBillingData): Promise<BillingData | "AlreadyExistingInvoiceData">;
    findByClient(clientId: number): Promise<any>;
    findOneByRFC(rfc: string): Promise<any>;
    updateInvoiceData(id: number, invoiceData: Partial<BillingDataDTO>): Promise<any>;
    remove(invoiceDataId: number): void;
}
