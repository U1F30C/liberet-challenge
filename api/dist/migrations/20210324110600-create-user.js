"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.createTable('users', {
                id: { type: Types.BIGINT, primaryKey: true, autoIncrement: true },
                name: { type: Types.STRING, allowNull: false },
                lastName: { type: Types.STRING, allowNull: false },
                email: { type: Types.STRING, allowNull: false },
                role: { type: Types.STRING, allowNull: true },
                active: { type: Types.BOOLEAN, allowNull: false },
                password: { type: Types.STRING, allowNull: true },
                createdAt: { type: Types.DATE, allowNull: false },
                updatedAt: { type: Types.DATE, allowNull: false },
            }, {
                transaction: transaction,
            });
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.dropTable('users');
    },
};
//# sourceMappingURL=20210324110600-create-user.js.map