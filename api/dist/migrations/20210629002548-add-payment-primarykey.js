"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.changeColumn('payments', 'appointmentCode', {
                type: Types.STRING,
                primaryKey: true,
                references: {
                    model: 'appointments',
                    key: 'code',
                },
            }, {
                transaction: transaction,
            });
            await queryInterface.addConstraint('payments', {
                type: 'primary key',
                name: 'payments_key',
                fields: ['appointmentCode'],
                transaction: transaction,
            });
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.removeConstraint('payments', 'payments_appointmentCode_fkey');
            await queryInterface.removeConstraint('payments', 'payments_key');
        });
    },
};
//# sourceMappingURL=20210629002548-add-payment-primarykey.js.map