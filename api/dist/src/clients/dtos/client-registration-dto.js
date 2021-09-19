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
exports.ClientRegistrationDTO = exports.ClientUserRegisterDTO = exports.UdgCodeInsertionDTO = exports.ClientInsertionDTO = exports.AddressInsertionDTO = void 0;
const class_validator_1 = require("class-validator");
const roles_1 = require("../../constants/roles");
const user_model_1 = require("../../users/models/user.model");
const sexes_1 = require("../../constants/sexes");
const udg_community_code_types_1 = require("../../constants/udg-community-code-types");
const udg_codes_model_1 = require("../../users/models/udg-codes.model");
const class_transformer_1 = require("class-transformer");
class AddressInsertionDTO {
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], AddressInsertionDTO.prototype, "clientId", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], AddressInsertionDTO.prototype, "municipalityId", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(5),
    __metadata("design:type", Number)
], AddressInsertionDTO.prototype, "zipCode", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 255),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], AddressInsertionDTO.prototype, "neighborhood", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 255),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], AddressInsertionDTO.prototype, "street", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 255),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], AddressInsertionDTO.prototype, "number", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(0, 255),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], AddressInsertionDTO.prototype, "internalNumber", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], AddressInsertionDTO.prototype, "stateId", void 0);
exports.AddressInsertionDTO = AddressInsertionDTO;
class ClientInsertionDTO {
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], ClientInsertionDTO.prototype, "userId", void 0);
__decorate([
    class_validator_1.IsDateString(),
    __metadata("design:type", String)
], ClientInsertionDTO.prototype, "birthDate", void 0);
__decorate([
    class_validator_1.IsEnum(sexes_1.Sexes),
    __metadata("design:type", String)
], ClientInsertionDTO.prototype, "sex", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(10),
    __metadata("design:type", String)
], ClientInsertionDTO.prototype, "phone", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 255),
    __metadata("design:type", String)
], ClientInsertionDTO.prototype, "occupation", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(18),
    __metadata("design:type", String)
], ClientInsertionDTO.prototype, "curp", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], ClientInsertionDTO.prototype, "nationalityId", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], ClientInsertionDTO.prototype, "originCountryId", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => AddressInsertionDTO),
    __metadata("design:type", AddressInsertionDTO)
], ClientInsertionDTO.prototype, "address", void 0);
exports.ClientInsertionDTO = ClientInsertionDTO;
class UdgCodeInsertionDTO {
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UdgCodeInsertionDTO.prototype, "userId", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(9),
    __metadata("design:type", String)
], UdgCodeInsertionDTO.prototype, "code", void 0);
__decorate([
    class_validator_1.IsEnum(udg_community_code_types_1.UdgCommunityCodeTypes),
    __metadata("design:type", String)
], UdgCodeInsertionDTO.prototype, "type", void 0);
exports.UdgCodeInsertionDTO = UdgCodeInsertionDTO;
class ClientUserRegisterDTO {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], ClientUserRegisterDTO.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 255),
    __metadata("design:type", String)
], ClientUserRegisterDTO.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 255),
    __metadata("design:type", String)
], ClientUserRegisterDTO.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], ClientUserRegisterDTO.prototype, "email", void 0);
__decorate([
    class_validator_1.IsEnum(roles_1.Roles),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], ClientUserRegisterDTO.prototype, "role", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => UdgCodeInsertionDTO),
    class_validator_1.IsOptional(),
    __metadata("design:type", UdgCodeInsertionDTO)
], ClientUserRegisterDTO.prototype, "udgCode", void 0);
exports.ClientUserRegisterDTO = ClientUserRegisterDTO;
class ClientRegistrationDTO {
}
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => ClientInsertionDTO),
    __metadata("design:type", ClientInsertionDTO)
], ClientRegistrationDTO.prototype, "client", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => ClientUserRegisterDTO),
    __metadata("design:type", ClientUserRegisterDTO)
], ClientRegistrationDTO.prototype, "user", void 0);
exports.ClientRegistrationDTO = ClientRegistrationDTO;
//# sourceMappingURL=client-registration-dto.js.map