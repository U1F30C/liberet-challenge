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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestResultController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../authorization/guards/jwt-auth.guard");
const create_test_result_dto_1 = require("./dto/create-test-result.dto");
const test_result_service_1 = require("./test-result.service");
let TestResultController = class TestResultController {
    constructor(testResultService) {
        this.testResultService = testResultService;
    }
    saveResults(createTestResultDto) {
        return this.testResultService.bulkRegisterResults(createTestResultDto);
    }
    markAsReady(code) {
        return this.testResultService.markAsReady(code);
    }
    markAsDiscarded(code) {
        return this.testResultService.markAsDiscarded(code);
    }
};
__decorate([
    common_1.Post(),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true, groups: ['draft'], whitelist: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_test_result_dto_1.CreateTestResultDto]),
    __metadata("design:returntype", void 0)
], TestResultController.prototype, "saveResults", null);
__decorate([
    common_1.Post('ready/:code'),
    __param(0, common_1.Param('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestResultController.prototype, "markAsReady", null);
__decorate([
    common_1.Post('discarded/:code'),
    __param(0, common_1.Param('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestResultController.prototype, "markAsDiscarded", null);
TestResultController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('test-results'),
    __metadata("design:paramtypes", [test_result_service_1.TestResultService])
], TestResultController);
exports.TestResultController = TestResultController;
//# sourceMappingURL=test-result.controller.js.map