"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.addColumn('testResults', 'discarded', {
            type: Types.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        });
        await queryInterface.addColumn('testResults', 'ready', {
            type: Types.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        });
        await queryInterface.addColumn('testResults', 'sent', {
            type: Types.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.removeColumn('testResults', 'discarded');
        await queryInterface.removeColumn('testResults', 'ready');
        await queryInterface.removeColumn('testResults', 'sent');
    },
};
//# sourceMappingURL=20210602204551-add-discarded-results.js.map