"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.changeColumn('appointments', 'minorId', {
            type: Types.INTEGER,
            allowNull: true,
            onDelete: 'restrict',
            references: {
                model: 'minors',
                key: 'id',
            },
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.removeConstraint('appointments', 'appointments_minorId_fkey');
    },
};
//# sourceMappingURL=20210627144325-create-minor-appointment-foreign-key.js.map