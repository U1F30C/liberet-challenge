"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const appointment_states_1 = require("../constants/appointment-states");
const sequelize_typescript_1 = require("sequelize-typescript");
const client_model_1 = require("../../clients/models/client.model");
const minor_model_1 = require("../../clients/models/minor.model");
const test_result_model_1 = require("../../test-result/entities/test-result.model");
const payment_model_1 = require("./payment.model");
const test_type_model_1 = require("./test-type.model");
let Appointment = class Appointment extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Appointment.prototype, "clientId", void 0);
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true }),
    __metadata("design:type", String)
], Appointment.prototype, "code", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Appointment.prototype, "numberTest", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Appointment.prototype, "date", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Appointment.prototype, "batch", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Appointment.prototype, "isForTraveling", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Appointment.prototype, "receptionTime", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.ENUM(appointment_states_1.AppointmentStates.Cancelled, appointment_states_1.AppointmentStates.NotAttended, appointment_states_1.AppointmentStates.PendingResults, appointment_states_1.AppointmentStates.ResultsDelivered, appointment_states_1.AppointmentStates.ResultsReady, appointment_states_1.AppointmentStates.Scheduled),
    }),
    __metadata("design:type", String)
], Appointment.prototype, "state", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Appointment.prototype, "comment", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Appointment.prototype, "minorId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Appointment.prototype, "testTypeId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Appointment.prototype, "previousAppointment", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Appointment.prototype, "dateOnly", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => test_type_model_1.TestType, 'testTypeId'),
    __metadata("design:type", test_type_model_1.TestType)
], Appointment.prototype, "testType", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => test_result_model_1.TestResult, 'testCode'),
    __metadata("design:type", Array)
], Appointment.prototype, "results", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => client_model_1.Client, 'clientId'),
    __metadata("design:type", client_model_1.Client)
], Appointment.prototype, "client", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => minor_model_1.Minor, 'minorId'),
    __metadata("design:type", Object)
], Appointment.prototype, "minor", void 0);
__decorate([
    sequelize_typescript_1.HasOne(() => payment_model_1.Payment, 'appointmentCode'),
    __metadata("design:type", payment_model_1.Payment)
], Appointment.prototype, "payment", void 0);
Appointment = __decorate([
    sequelize_typescript_1.Table({
        modelName: 'appointment',
    })
], Appointment);
exports.Appointment = Appointment;
//# sourceMappingURL=appointment.model.js.map