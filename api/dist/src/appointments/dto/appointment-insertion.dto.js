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
exports.AppointmentInsertionDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class AppointmentInsertionDTO {
}
__decorate([
    class_transformer_1.Transform((dateString) => new Date(dateString.value)),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], AppointmentInsertionDTO.prototype, "date", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], AppointmentInsertionDTO.prototype, "invoiceRequired", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], AppointmentInsertionDTO.prototype, "minorClientId", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], AppointmentInsertionDTO.prototype, "paymentMethod", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], AppointmentInsertionDTO.prototype, "testTypeId", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], AppointmentInsertionDTO.prototype, "isForTraveling", void 0);
exports.AppointmentInsertionDTO = AppointmentInsertionDTO;
//# sourceMappingURL=appointment-insertion.dto.js.map