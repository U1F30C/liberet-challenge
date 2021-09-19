"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.renameColumn('minors', 'fatherLastName', 'lastName');
            await queryInterface.renameColumn('minors', 'motherLastName', 'mothersLastName');
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.renameColumn('minors', 'lastName', 'fatherLastName');
            await queryInterface.renameColumn('minors', 'mothersLastName', 'motherLastName');
        });
    },
};
//# sourceMappingURL=20210626144253-change-minors-name.js.map