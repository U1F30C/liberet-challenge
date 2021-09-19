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
exports.AssistanceController = void 0;
const common_1 = require("@nestjs/common");
const querist_1 = require("../../shared/querying/querist");
const assistance_service_1 = require("./assistance.service");
let AssistanceController = class AssistanceController {
    constructor(assistanceService) {
        this.assistanceService = assistanceService;
    }
    async findAppointmentsDay(query) {
        return this.assistanceService.findAppointmentsDay(query);
    }
    findOne(id) {
        return this.assistanceService.findWithMinor(id);
    }
    markAssistance(code) {
        return this.assistanceService.markAssistance(code);
    }
    markNonAssistance(code) {
        return this.assistanceService.markNonAssistance(code);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssistanceController.prototype, "findAppointmentsDay", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssistanceController.prototype, "findOne", null);
__decorate([
    common_1.Patch('markAssistance/:code'),
    __param(0, common_1.Param('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssistanceController.prototype, "markAssistance", null);
__decorate([
    common_1.Patch('markNonAssistance/:code'),
    __param(0, common_1.Param('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssistanceController.prototype, "markNonAssistance", null);
AssistanceController = __decorate([
    common_1.Controller('assistance'),
    __metadata("design:paramtypes", [assistance_service_1.AssistanceService])
], AssistanceController);
exports.AssistanceController = AssistanceController;
//# sourceMappingURL=assistance.controller.js.map