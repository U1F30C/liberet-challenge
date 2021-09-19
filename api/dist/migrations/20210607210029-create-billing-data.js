"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.createTable('billingData', {
            id: {
                type: Types.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            clientId: {
                type: Types.BIGINT,
                allowNull: false,
                references: {
                    model: 'clients',
                    key: 'userId',
                },
            },
            rfc: {
                type: Types.STRING(13),
                allowNull: false,
            },
            corporateName: {
                type: Types.STRING,
            },
            email: {
                type: Types.STRING,
            },
            municipalityId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'municipalities',
                    key: 'id',
                },
            },
            zipCode: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            street: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            number: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            internalNumber: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            stateId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: 'states',
                    key: 'id',
                },
                allowNull: false,
            },
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.dropTable('billingData');
    },
};
//# sourceMappingURL=20210607210029-create-billing-data.js.map