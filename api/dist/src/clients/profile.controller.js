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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../authorization/guards/jwt-auth.guard");
const request_with_users_1 = require("../authorization/types/request-with-users");
const validation_whitelist_pipe_1 = require("../shared/validation/validation-whitelist-pipe");
const minor_dto_1 = require("./dtos/minor.dto");
const profile_service_1 = require("./services/profile.service");
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async getProfile(request) {
        const result = await this.profileService.getProfile(request.user.id);
        return result;
    }
    async patchProfile(body, request) {
        await this.profileService.patchProfile(request.user.id, body);
    }
    async addMinor(minor, request) {
        const createdMinor = await this.profileService.addMinor(minor, request.user.id);
        return createdMinor;
    }
    async updateMinor(minor, request) {
        const updated = await this.profileService.updateMinor(minor, request.user.id);
    }
    async getMinors(request) {
        const minors = await this.profileService.getMinors(request.user.id);
        return minors;
    }
    async deleteMinors(id, request) {
        await this.profileService.deleteMinor(id, request.user.id);
    }
};
__decorate([
    common_1.Get(''),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getProfile", null);
__decorate([
    common_1.HttpCode(204),
    common_1.Patch(),
    __param(0, common_1.Body()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "patchProfile", null);
__decorate([
    common_1.Post('minors'),
    common_1.UsePipes(validation_whitelist_pipe_1.ValidationWhitelistPipe(['insert'])),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [minor_dto_1.MinorDTO, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "addMinor", null);
__decorate([
    common_1.HttpCode(204),
    common_1.Patch('minors'),
    common_1.UsePipes(validation_whitelist_pipe_1.ValidationWhitelistPipe(['update'])),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [minor_dto_1.MinorDTO, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateMinor", null);
__decorate([
    common_1.Get('minors'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getMinors", null);
__decorate([
    common_1.HttpCode(204),
    common_1.Delete('minors/:minorId'),
    __param(0, common_1.Param('minorId')), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "deleteMinors", null);
ProfileController = __decorate([
    common_1.Controller('profile'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map