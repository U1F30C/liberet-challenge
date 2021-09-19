"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payment_methods_1 = require("../src/appointments/constants/payment-methods");
const payment_model_1 = require("../src/appointments/entities/payment.model");
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.createTable('payments', {
            appointmentCode: { type: Types.STRING },
            code: { type: Types.STRING },
            amount: { type: Types.DECIMAL, allowNull: false },
            invoiceRequired: { type: Types.BOOLEAN, allowNull: false },
            invoiceDelivered: { type: Types.BOOLEAN, allowNull: false },
            type: {
                type: Types.ENUM(payment_methods_1.PaymentMethods.Online, payment_methods_1.PaymentMethods.BankDeposit, payment_methods_1.PaymentMethods.WireTransfer),
                allowNull: false,
            },
            status: {
                type: Types.ENUM(payment_model_1.PaymentStatuses.Pending, payment_model_1.PaymentStatuses.Paidout, payment_model_1.PaymentStatuses.InReview, payment_model_1.PaymentStatuses.Cancelled),
            },
            createdAt: {
                type: Types.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Types.DATE,
                allowNull: false,
            },
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.dropTable('payments');
    },
};
//# sourceMappingURL=20210626202326-add-payment-model.js.map