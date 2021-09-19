"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.changeColumn('appointments', 'createdAt', {
                type: Types.DATE,
                allowNull: false,
            }, {
                transaction: transaction,
            });
            await queryInterface.changeColumn('appointments', 'updatedAt', {
                type: Types.DATE,
                allowNull: false,
            }, {
                transaction: transaction,
            });
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.changeColumn('appointments', 'createdAt', {
                type: Types.DATE,
                allowNull: true,
            }, {
                transaction: transaction,
            });
            await queryInterface.changeColumn('appointments', 'updatedAt', {
                type: Types.DATE,
                allowNull: true,
            }, {
                transaction: transaction,
            });
        });
    },
};
//# sourceMappingURL=20210624005459-make-appointment-timestamps-notnull.js.map