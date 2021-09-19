"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.createTable('appointmentAvailability', {
            appointmentDate: {
                type: Types.DATE,
                primaryKey: true,
            },
            numberOfAppointments: {
                type: Types.INTEGER,
                primaryKey: true,
            },
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.dropTable('appointmentAvailability');
    },
};
//# sourceMappingURL=20210607214149-create-appointment-availability.js.map