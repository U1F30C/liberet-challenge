"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.changeColumn('appointments', 'clientId', {
            type: Types.BIGINT,
            allowNull: false,
            references: {
                model: 'clients',
                key: 'userId',
            },
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.changeColumn('appointments', 'clientId', {
                type: Types.BIGINT,
            }, {
                transaction: transaction,
            });
            await queryInterface.removeConstraint('appointments', 'appointments_clientId_fkey', {
                transaction: transaction,
            });
        });
    },
};
//# sourceMappingURL=20210607202707-create-foreign-constraint-client-appointment.js.map