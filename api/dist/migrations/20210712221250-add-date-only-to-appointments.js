"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.addColumn('appointments', 'dateOnly', {
                type: Types.STRING,
                allowNull: false,
            }, {
                transaction: transaction,
            });
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.removeColumn('appointments', 'dateOnly');
    },
};
//# sourceMappingURL=20210712221250-add-date-only-to-appointments.js.map