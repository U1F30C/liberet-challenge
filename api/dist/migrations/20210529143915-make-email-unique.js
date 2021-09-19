"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.changeColumn('users', 'email', {
                unique: true,
                type: Types.STRING,
                allowNull: false,
            }, {
                transaction: transaction,
            });
            await queryInterface.addColumn('users', 'isEmailValidated', {
                type: Types.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            }, {
                transaction: transaction,
            });
            await queryInterface.changeColumn('users', 'role', {
                type: Types.STRING,
                allowNull: true,
            }, {
                transaction: transaction,
            });
            await queryInterface.addColumn('users', 'mothersLastName', {
                type: Types.STRING,
                allowNull: true,
            }, {
                transaction: transaction,
            });
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.changeColumn('users', 'email', {
                type: Types.STRING,
                allowNull: false,
            }, {
                transaction: transaction,
            });
            await queryInterface.removeColumn('users', 'isEmailValidated', {
                transaction: transaction,
            });
            await queryInterface.changeColumn('users', 'role', {
                type: Types.STRING,
            }, {
                transaction: transaction,
            });
            await queryInterface.removeColumn('users', 'mothersLastName', {
                transaction: transaction,
            });
        });
    },
};
//# sourceMappingURL=20210529143915-make-email-unique.js.map