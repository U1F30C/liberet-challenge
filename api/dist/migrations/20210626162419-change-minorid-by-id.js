"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.renameColumn('minors', 'minorId', 'id');
    },
    down: async (queryInterface, Types) => {
        await queryInterface.renameColumn('minors', 'id', 'minorId');
    },
};
//# sourceMappingURL=20210626162419-change-minorid-by-id.js.map