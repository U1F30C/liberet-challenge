"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.addColumn('testTypes', 'releaseTimeOffset', {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: `1970-01-01T00:00:00.000Z`,
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.removeColumn('testTypes', 'releaseTimeOffset');
    },
};
//# sourceMappingURL=20210712202001-add-appointment-release-time-property.js.map