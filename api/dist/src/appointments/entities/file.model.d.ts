import { Model } from 'sequelize-typescript';
import { ProofOfPaymentStatuses } from '../constants/proof-of-payment-statuses';
import { Payment } from './payment.model';
export interface IProofOfPayment {
    id?: number;
    originalName: string;
    mimeType: string;
    fileName: string;
    path: string;
    size: number;
    proofOfPaymentStatus: ProofOfPaymentStatuses;
    appointmentCode: string;
}
export declare class ProofOfPayment extends Model<ProofOfPayment, IProofOfPayment> implements IProofOfPayment {
    id: number;
    originalName: string;
    mimeType: string;
    fileName: string;
    path: string;
    size: number;
    proofOfPaymentStatus: ProofOfPaymentStatuses;
    appointmentCode: string;
    payment: Payment;
}
