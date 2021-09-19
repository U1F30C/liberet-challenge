"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const audit_model_1 = require("../src/audits/models/audit.model");
module.exports = {
    up: async (queryInterface, Type) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.createTable('audits', {
                id_action: {
                    type: sequelize_1.DataTypes.BIGINT,
                    primaryKey: true,
                    autoIncrement: true
                },
                user_id: {
                    type: sequelize_1.DataTypes.BIGINT,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                },
                type: {
                    type: sequelize_1.DataTypes.ENUM(audit_model_1.AuditType.calendarEdit, audit_model_1.AuditType.scheduleEdit, audit_model_1.AuditType.userAdd, audit_model_1.AuditType.userDelete, audit_model_1.AuditType.userEdit, audit_model_1.AuditType.testReception, audit_model_1.AuditType.loadResults, audit_model_1.AuditType.noShowAppointment, audit_model_1.AuditType.validatePayment),
                    allowNull: false
                },
                previous_value: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false
                },
                new_value: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false
                },
                additional_data: {
                    type: sequelize_1.DataTypes.JSON,
                    allowNull: true
                },
                createdAt: { type: sequelize_1.DataTypes.DATE },
                updatedAt: { type: sequelize_1.DataTypes.DATE }
            }, {
                transaction: transaction,
            });
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.dropTable('audits');
    },
};
//# sourceMappingURL=20210622214234-audits.js.map