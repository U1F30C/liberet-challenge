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
exports.Audits = exports.AuditType = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const user_model_1 = require("../../users/models/user.model");
var AuditType;
(function (AuditType) {
    AuditType["userEdit"] = "Edici\u00F3n de colaborador";
    AuditType["userDelete"] = "Eliminar colaborador";
    AuditType["userAdd"] = "Nuevo colaborador";
    AuditType["scheduleEdit"] = "Edici\u00F3n de horarios";
    AuditType["calendarEdit"] = "Edici\u00F3n de dias laborables";
    AuditType["testReception"] = "Recepcion de muestra";
    AuditType["noShowAppointment"] = "Inasistencia a cita";
    AuditType["loadResults"] = "Cargar resultados de muestra";
    AuditType["validatePayment"] = "Pago v\u00E1lidado";
})(AuditType = exports.AuditType || (exports.AuditType = {}));
let Audits = class Audits extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], Audits.prototype, "id_action", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Audits.prototype, "user_id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Audits.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Audits.prototype, "previous_value", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Audits.prototype, "new_value", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_1.DataTypes.JSON }),
    __metadata("design:type", Object)
], Audits.prototype, "additional_data", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_1.DataTypes.DATE }),
    __metadata("design:type", Object)
], Audits.prototype, "createdAt", void 0);
Audits = __decorate([
    sequelize_typescript_1.Table({
        modelName: 'audit',
    })
], Audits);
exports.Audits = Audits;
//# sourceMappingURL=audit.model.js.map