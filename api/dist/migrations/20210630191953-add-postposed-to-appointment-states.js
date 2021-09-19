"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appointment_states_1 = require("../src/appointments/constants/appointment-states");
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.addColumn('appointments', 'tmp', {
                type: Types.STRING,
                allowNull: true,
            }, {
                transaction: transaction,
            });
            await queryInterface.sequelize.query('UPDATE "appointments" SET "tmp"="state"::text', {
                transaction: transaction,
            });
            await queryInterface.removeColumn('appointments', 'state', {
                transaction: transaction,
            });
            await queryInterface.sequelize.query('DROP TYPE enum_appointments_state', {
                transaction: transaction,
            });
            await queryInterface.addColumn('appointments', 'state', {
                type: Types.ENUM(appointment_states_1.AppointmentStates.Cancelled, appointment_states_1.AppointmentStates.NotAttended, appointment_states_1.AppointmentStates.PendingResults, appointment_states_1.AppointmentStates.ResultsDelivered, appointment_states_1.AppointmentStates.ResultsReady, appointment_states_1.AppointmentStates.Scheduled, appointment_states_1.AppointmentStates.Postponed),
                allowNull: false,
                defaultValue: appointment_states_1.AppointmentStates.Scheduled,
            }, {
                transaction: transaction,
            });
            await queryInterface.sequelize.query('UPDATE "appointments" SET "state"="tmp"::enum_appointments_state', {
                transaction: transaction,
            });
            await queryInterface.removeColumn('appointments', 'tmp', {
                transaction: transaction,
            });
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.addColumn('appointments', 'tmp', {
                type: Types.STRING,
                allowNull: true,
            }, {
                transaction: transaction,
            });
            await queryInterface.sequelize.query('UPDATE "appointments" SET "tmp"="state"::text', {
                transaction: transaction,
            });
            await queryInterface.removeColumn('appointments', 'state', {
                transaction: transaction,
            });
            await queryInterface.sequelize.query('DROP TYPE enum_appointments_state', {
                transaction: transaction,
            });
            await queryInterface.addColumn('appointments', 'state', {
                type: Types.ENUM(appointment_states_1.AppointmentStates.Cancelled, appointment_states_1.AppointmentStates.NotAttended, appointment_states_1.AppointmentStates.PendingResults, appointment_states_1.AppointmentStates.ResultsDelivered, appointment_states_1.AppointmentStates.ResultsReady, appointment_states_1.AppointmentStates.Scheduled),
                allowNull: false,
                defaultValue: appointment_states_1.AppointmentStates.Scheduled,
            }, {
                transaction: transaction,
            });
            await queryInterface.sequelize.query('UPDATE "appointments" SET "state"="tmp"::enum_appointments_state', {
                transaction: transaction,
            });
            await queryInterface.removeColumn('appointments', 'tmp', {
                transaction: transaction,
            });
        });
    },
};
//# sourceMappingURL=20210630191953-add-postposed-to-appointment-states.js.map