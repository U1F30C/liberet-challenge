"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.addColumn('minors', 'passport', {
            type: Types.STRING,
            allowNull: true,
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.removeColumn('minors', 'passport');
    },
};
//# sourceMappingURL=20210720222848-add-minor-passport.js.map