"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.addColumn('appointments', 'previousAppointment', {
            type: Types.STRING,
            references: {
                model: 'appointments',
                key: 'code',
            },
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.removeColumn('appointments', 'previousAppointment');
    },
};
//# sourceMappingURL=20210629235820-add-previou-appointment-field.js.map