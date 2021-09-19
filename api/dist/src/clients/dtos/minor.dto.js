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
exports.MinorDTO = void 0;
const class_validator_1 = require("class-validator");
const sexes_1 = require("../../constants/sexes");
const curp_validator_1 = require("../../shared/validation/curp-validator");
class MinorDTO {
}
__decorate([
    class_validator_1.IsNumberString({
        no_symbols: true,
    }, {
        groups: ['insert', 'update'],
    }),
    class_validator_1.IsOptional({
        groups: ['insert'],
    }),
    __metadata("design:type", Number)
], MinorDTO.prototype, "id", void 0);
__decorate([
    class_validator_1.IsNumberString({
        no_symbols: true,
    }, {
        groups: ['insert', 'update'],
    }),
    class_validator_1.IsOptional({
        groups: ['insert', 'update'],
    }),
    __metadata("design:type", Number)
], MinorDTO.prototype, "clientId", void 0);
__decorate([
    class_validator_1.IsString({
        groups: ['insert', 'update'],
    }),
    __metadata("design:type", String)
], MinorDTO.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString({
        groups: ['insert', 'update'],
    }),
    __metadata("design:type", String)
], MinorDTO.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsString({
        groups: ['insert', 'update'],
    }),
    class_validator_1.IsOptional({
        groups: ['insert', 'update'],
    }),
    __metadata("design:type", String)
], MinorDTO.prototype, "mothersLastName", void 0);
__decorate([
    class_validator_1.IsString({
        groups: ['insert', 'update'],
    }),
    class_validator_1.Validate(curp_validator_1.CURPValidator, {
        groups: ['insert', 'update'],
    }),
    __metadata("design:type", String)
], MinorDTO.prototype, "curp", void 0);
__decorate([
    class_validator_1.IsString({
        groups: ['insert', 'update'],
    }),
    __metadata("design:type", String)
], MinorDTO.prototype, "sex", void 0);
__decorate([
    class_validator_1.IsDateString(undefined, {
        groups: ['insert', 'update'],
    }),
    __metadata("design:type", Date)
], MinorDTO.prototype, "birthDate", void 0);
__decorate([
    class_validator_1.IsOptional({
        groups: ['insert', 'update'],
    }),
    __metadata("design:type", String)
], MinorDTO.prototype, "passport", void 0);
exports.MinorDTO = MinorDTO;
//# sourceMappingURL=minor.dto.js.map