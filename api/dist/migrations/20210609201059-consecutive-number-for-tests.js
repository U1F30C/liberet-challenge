"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.createTable('consecutives', {
            batch: { type: Types.STRING, allowNull: false, primaryKey: true },
            day: { type: Types.DATEONLY, allowNull: false, primaryKey: true },
            current: { type: Types.INTEGER, allowNull: false },
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.dropTable('consecutives');
    },
};
//# sourceMappingURL=20210609201059-consecutive-number-for-tests.js.map