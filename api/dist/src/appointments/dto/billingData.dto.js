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
exports.BillingDataDTO = void 0;
const class_validator_1 = require("class-validator");
class BillingDataDTO {
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], BillingDataDTO.prototype, "id", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], BillingDataDTO.prototype, "clientId", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], BillingDataDTO.prototype, "rfc", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], BillingDataDTO.prototype, "corporateName", void 0);
__decorate([
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], BillingDataDTO.prototype, "email", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], BillingDataDTO.prototype, "municipalityId", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], BillingDataDTO.prototype, "zipCode", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], BillingDataDTO.prototype, "street", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], BillingDataDTO.prototype, "number", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], BillingDataDTO.prototype, "internalNumber", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], BillingDataDTO.prototype, "stateId", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], BillingDataDTO.prototype, "localityId", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], BillingDataDTO.prototype, "neighborhood", void 0);
exports.BillingDataDTO = BillingDataDTO;
//# sourceMappingURL=billingData.dto.js.map