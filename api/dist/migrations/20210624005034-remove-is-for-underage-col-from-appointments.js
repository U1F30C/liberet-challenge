"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.removeColumn('appointments', 'isForUnderaged');
    },
    down: async (queryInterface, Types) => {
        await queryInterface.addColumn('appointments', 'isForUnderaged', {
            type: sequelize_1.DataTypes.BOOLEAN,
        });
    },
};
//# sourceMappingURL=20210624005034-remove-is-for-underage-col-from-appointments.js.map