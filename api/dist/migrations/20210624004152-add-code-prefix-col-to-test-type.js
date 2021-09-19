"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.addColumn('testTypes', 'codePrefix', {
            type: Types.STRING,
            allowNull: false,
            defaultValue: 'U',
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.removeColumn('testTypes', 'codePrefix');
    },
};
//# sourceMappingURL=20210624004152-add-code-prefix-col-to-test-type.js.map