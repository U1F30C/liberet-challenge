"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.createTable('testResults', {
            id: { type: Types.BIGINT, primaryKey: true, autoIncrement: true },
            testCode: {
                type: Types.STRING,
                references: { model: 'appointments', key: 'code' },
                allowNull: false
            },
            resultData: { type: Types.JSON },
            comments: { type: Types.TEXT },
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.dropTable('testResults');
    },
};
//# sourceMappingURL=20210526221537-create-test-result.js.map