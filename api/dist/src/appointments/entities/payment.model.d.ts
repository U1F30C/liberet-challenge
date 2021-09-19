import { Model } from 'sequelize-typescript';
import { PaymentMethods } from '../constants/payment-methods';
import { ProofOfPayment } from './file.model';
export declare enum PaymentStatuses {
    Pending = "Pending",
    Paidout = "Paidout",
    InReview = "InReview",
    Cancelled = "Canceled"
}
export interface IPayment {
    appointmentCode: string;
    code: string;
    amount: string;
    invoiceRequired: boolean;
    invoiceDelivered: boolean;
    type: PaymentMethods;
    status: PaymentStatuses;
}
export declare class Payment extends Model<IPayment> implements IPayment {
    appointmentCode: string;
    code: string;
    amount: string;
    invoiceRequired: boolean;
    invoiceDelivered: boolean;
    type: PaymentMethods;
    status: PaymentStatuses;
    proofOfPayments: ProofOfPayment[];
}
