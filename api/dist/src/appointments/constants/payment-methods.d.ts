export declare enum PaymentMethods {
    Online = "Online",
    BankDeposit = "BankDeposit",
    WireTransfer = "WireTransfer"
}
export declare const PaymentMethodsDisplayNameMap: {
    Online: string;
    BankDeposit: string;
    WireTransfer: string;
};
export interface PaymentMethod {
    id: number;
    name: string;
    code: PaymentMethods;
}
export declare function getPaymentMethodByEnum(paymentMethod: PaymentMethods): PaymentMethod;
export declare function getPaymentMethodById(paymentMethodId: number): PaymentMethod;
export declare function getPaymentMethods(): PaymentMethod[];
