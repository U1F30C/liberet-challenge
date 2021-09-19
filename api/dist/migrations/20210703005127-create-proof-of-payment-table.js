"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const proof_of_payment_statuses_1 = require("../src/appointments/constants/proof-of-payment-statuses");
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.createTable('proofOfPayments', {
            id: {
                type: Types.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            originalName: {
                type: Types.STRING,
                allowNull: false,
            },
            mimeType: {
                type: Types.STRING,
                allowNull: false,
            },
            fileName: {
                type: Types.STRING,
                allowNull: false,
            },
            path: {
                type: Types.STRING,
                allowNull: false,
            },
            size: {
                type: Types.INTEGER,
                allowNull: false,
            },
            proofOfPaymentStatus: {
                type: Types.ENUM(proof_of_payment_statuses_1.ProofOfPaymentStatuses.InReview, proof_of_payment_statuses_1.ProofOfPaymentStatuses.Invalid, proof_of_payment_statuses_1.ProofOfPaymentStatuses.Valid),
                allowNull: false,
                defaultValue: proof_of_payment_statuses_1.ProofOfPaymentStatuses.InReview,
            },
            appointmentCode: {
                type: Types.STRING,
                references: {
                    model: 'payments',
                    key: 'appointmentCode',
                },
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
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.dropTable('proofOfPayments', {
                transaction: transaction,
            });
            await queryInterface.sequelize.query('DROP TYPE "enum_proofOfPayments_proofOfPaymentStatus"', {
                transaction: transaction,
            });
        });
    },
};
//# sourceMappingURL=20210703005127-create-proof-of-payment-table.js.map