"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.addColumn('clients', 'passport', {
            type: Types.STRING,
            allowNull: true,
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.removeColumn('clients', 'passport');
    },
};
//# sourceMappingURL=20210624010331-add-passport-to-client.js.map