"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface, Type) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.createTable('appointments', {
                clientId: {
                    type: sequelize_1.DataTypes.BIGINT,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                },
                code: { type: sequelize_1.DataTypes.STRING, primaryKey: true },
                numberTest: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
                date: { type: sequelize_1.DataTypes.DATE },
                testType: { type: sequelize_1.DataTypes.STRING },
                isForTraveling: { type: sequelize_1.DataTypes.BOOLEAN },
                receptionTime: { type: sequelize_1.DataTypes.STRING, allowNull: true },
                state: { type: sequelize_1.DataTypes.STRING },
                comment: { type: sequelize_1.DataTypes.STRING },
                isForUnderaged: { type: sequelize_1.DataTypes.BOOLEAN },
                minorId: { type: sequelize_1.DataTypes.BIGINT, allowNull: true },
                createdAt: { type: sequelize_1.DataTypes.DATE },
                updatedAt: { type: sequelize_1.DataTypes.DATE },
            }, {
                transaction: transaction,
            });
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.dropTable('appointments');
    },
};
//# sourceMappingURL=20210522202701-create-appointment.js.map