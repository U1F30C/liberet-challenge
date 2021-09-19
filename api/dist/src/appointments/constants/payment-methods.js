"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentMethods = exports.getPaymentMethodById = exports.getPaymentMethodByEnum = exports.PaymentMethodsDisplayNameMap = exports.PaymentMethods = void 0;
var PaymentMethods;
(function (PaymentMethods) {
    PaymentMethods["Online"] = "Online";
    PaymentMethods["BankDeposit"] = "BankDeposit";
    PaymentMethods["WireTransfer"] = "WireTransfer";
})(PaymentMethods = exports.PaymentMethods || (exports.PaymentMethods = {}));
exports.PaymentMethodsDisplayNameMap = {
    [PaymentMethods.Online]: 'Pago en Línea',
    [PaymentMethods.BankDeposit]: 'Depósito Bancario',
    [PaymentMethods.WireTransfer]: 'Transferencia Bancaria',
};
function getPaymentMethodByEnum(paymentMethod) {
    return getPaymentMethods().find((e) => e.code == paymentMethod);
}
exports.getPaymentMethodByEnum = getPaymentMethodByEnum;
function getPaymentMethodById(paymentMethodId) {
    return getPaymentMethods().find((pm) => pm.id == paymentMethodId);
}
exports.getPaymentMethodById = getPaymentMethodById;
function getPaymentMethods() {
    return [
        {
            id: 1,
            name: exports.PaymentMethodsDisplayNameMap[PaymentMethods.Online],
            code: PaymentMethods.Online,
        },
        {
            id: 2,
            name: exports.PaymentMethodsDisplayNameMap[PaymentMethods.BankDeposit],
            code: PaymentMethods.BankDeposit,
        },
        {
            id: 3,
            name: exports.PaymentMethodsDisplayNameMap[PaymentMethods.WireTransfer],
            code: PaymentMethods.WireTransfer,
        },
    ];
}
exports.getPaymentMethods = getPaymentMethods;
//# sourceMappingURL=payment-methods.js.map