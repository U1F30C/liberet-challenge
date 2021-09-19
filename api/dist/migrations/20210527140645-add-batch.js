"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.addColumn('appointments', 'batch', {
            type: Types.STRING,
            allowNull: true,
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.removeColumn('appointments', 'batch');
    },
};
//# sourceMappingURL=20210527140645-add-batch.js.map