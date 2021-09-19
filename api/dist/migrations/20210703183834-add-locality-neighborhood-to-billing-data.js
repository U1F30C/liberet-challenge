"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.addColumn('billingData', 'localityId', {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'localities',
                key: 'id',
            }
        });
        await queryInterface.addColumn('billingData', 'neighborhood', {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.removeColumn('clients', 'passport');
    },
};
//# sourceMappingURL=20210703183834-add-locality-neighborhood-to-billing-data.js.map