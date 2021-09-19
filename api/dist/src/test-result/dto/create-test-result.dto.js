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
exports.CreateTestResultDto = exports.ResultDTO = exports.AntibodiesResult = exports.AntigenResult = exports.PCRResult = exports.BaseResultData = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const test_type_codes_1 = require("../../appointments/constants/test-type-codes");
class BaseResultData {
}
__decorate([
    class_validator_1.IsEnum(test_type_codes_1.TestTypeCodes, { always: true }),
    __metadata("design:type", String)
], BaseResultData.prototype, "type", void 0);
__decorate([
    class_validator_1.IsString({ always: true }),
    __metadata("design:type", String)
], BaseResultData.prototype, "supervisorName", void 0);
__decorate([
    class_validator_1.IsString({ always: true }),
    __metadata("design:type", String)
], BaseResultData.prototype, "supervisorData", void 0);
__decorate([
    class_validator_1.IsString({ always: true }),
    __metadata("design:type", String)
], BaseResultData.prototype, "technique", void 0);
__decorate([
    class_validator_1.IsString({ always: true }),
    __metadata("design:type", String)
], BaseResultData.prototype, "sampleType", void 0);
exports.BaseResultData = BaseResultData;
function OptionalResultProperty() {
    return class_validator_1.IsOptional({ groups: ['draft', 'ready'] });
}
class PCRResult extends BaseResultData {
}
__decorate([
    class_validator_1.IsString({ always: true }),
    OptionalResultProperty(),
    __metadata("design:type", String)
], PCRResult.prototype, "RP", void 0);
__decorate([
    class_validator_1.IsString({ always: true }),
    OptionalResultProperty(),
    __metadata("design:type", String)
], PCRResult.prototype, "N1", void 0);
__decorate([
    class_validator_1.IsString({ always: true }),
    OptionalResultProperty(),
    __metadata("design:type", String)
], PCRResult.prototype, "N2", void 0);
__decorate([
    class_validator_1.IsString({ always: true }),
    OptionalResultProperty(),
    __metadata("design:type", String)
], PCRResult.prototype, "N3", void 0);
__decorate([
    class_validator_1.IsBoolean({ always: true }),
    class_validator_1.IsOptional({ groups: ['draft'] }),
    __metadata("design:type", Boolean)
], PCRResult.prototype, "isPositive", void 0);
exports.PCRResult = PCRResult;
class AntigenResult extends BaseResultData {
}
__decorate([
    class_validator_1.IsBoolean({ always: true }),
    class_validator_1.IsOptional({ groups: ['draft'] }),
    __metadata("design:type", Boolean)
], AntigenResult.prototype, "isPositive", void 0);
exports.AntigenResult = AntigenResult;
class AntibodiesResult extends BaseResultData {
}
__decorate([
    class_validator_1.IsBoolean({ always: true }),
    OptionalResultProperty(),
    __metadata("design:type", Boolean)
], AntibodiesResult.prototype, "IgM", void 0);
__decorate([
    class_validator_1.IsBoolean({ always: true }),
    OptionalResultProperty(),
    __metadata("design:type", Boolean)
], AntibodiesResult.prototype, "IgC", void 0);
__decorate([
    class_validator_1.IsBoolean({ always: true }),
    class_validator_1.IsOptional({ groups: ['draft'] }),
    __metadata("design:type", Boolean)
], AntibodiesResult.prototype, "isPositive", void 0);
exports.AntibodiesResult = AntibodiesResult;
class ResultDTO {
}
__decorate([
    class_validator_1.IsString({ always: true }),
    __metadata("design:type", String)
], ResultDTO.prototype, "testCode", void 0);
__decorate([
    class_validator_1.ValidateNested({ always: true }),
    class_validator_1.IsObject({ always: true }),
    class_transformer_1.Type(() => BaseResultData, {
        keepDiscriminatorProperty: true,
        discriminator: {
            property: 'type',
            subTypes: [
                { value: PCRResult, name: test_type_codes_1.TestTypeCodes.PCR },
                { value: AntigenResult, name: test_type_codes_1.TestTypeCodes.Antigen },
                { value: AntibodiesResult, name: test_type_codes_1.TestTypeCodes.Antibodies },
            ],
        },
    }),
    __metadata("design:type", Object)
], ResultDTO.prototype, "resultData", void 0);
__decorate([
    class_validator_1.IsString({ always: true }),
    class_validator_1.IsOptional({ always: true }),
    __metadata("design:type", String)
], ResultDTO.prototype, "comments", void 0);
exports.ResultDTO = ResultDTO;
class CreateTestResultDto {
}
__decorate([
    class_validator_1.ValidateNested({ always: true, each: true }),
    class_validator_1.IsArray({ always: true }),
    class_transformer_1.Type(() => ResultDTO),
    __metadata("design:type", Array)
], CreateTestResultDto.prototype, "results", void 0);
exports.CreateTestResultDto = CreateTestResultDto;
//# sourceMappingURL=create-test-result.dto.js.map