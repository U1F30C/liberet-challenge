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
exports.TestResult = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const appointment_model_1 = require("../../appointments/entities/appointment.model");
let TestResult = class TestResult extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], TestResult.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TestResult.prototype, "testCode", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.JSON }),
    __metadata("design:type", Object)
], TestResult.prototype, "resultData", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.TEXT }),
    __metadata("design:type", String)
], TestResult.prototype, "comments", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], TestResult.prototype, "discarded", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], TestResult.prototype, "ready", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], TestResult.prototype, "sent", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => appointment_model_1.Appointment, 'testCode'),
    __metadata("design:type", appointment_model_1.Appointment)
], TestResult.prototype, "appointment", void 0);
TestResult = __decorate([
    sequelize_typescript_1.Table({
        modelName: 'testResult',
        timestamps: false,
    })
], TestResult);
exports.TestResult = TestResult;
//# sourceMappingURL=test-result.model.js.map