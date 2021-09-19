"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.createTable('minors', {
                minorId: { type: sequelize_1.DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
                clientId: { type: sequelize_1.DataTypes.BIGINT, allowNull: false },
                name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
                fatherLastName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
                motherLastName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
                curp: { type: sequelize_1.DataTypes.STRING, allowNull: true },
                birthDate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
                createdAt: { type: sequelize_1.DataTypes.DATE },
                updatedAt: { type: sequelize_1.DataTypes.DATE },
            }, {
                transaction: transaction,
            });
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.dropTable('minors');
    },
};
//# sourceMappingURL=20210608220117-create-minor-table.js.map