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
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../authorization/guards/jwt-auth.guard");
const querist_1 = require("../shared/querying/querist");
const clients_service_1 = require("./services/clients.service");
const client_user_registration_service_1 = require("./services/client-user-registration.service");
const error_responses_1 = require("../utils/error-responses");
let ClientController = class ClientController {
    constructor(clientService, clientUserRegistrationService) {
        this.clientService = clientService;
        this.clientUserRegistrationService = clientUserRegistrationService;
    }
    async findAll(query) {
        return this.clientService.findAll(query);
    }
    findOne(id) {
        return this.clientService.findClientByUserIdExpand(+id);
    }
    async findAllFullData(query) {
        return this.clientService.findAllWithFullData(query);
    }
    async update(id, client) {
        const updateResult = this.clientService.update(id, client);
        return updateResult;
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id(\\d+)'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findOne", null);
__decorate([
    common_1.Get('expanded'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "findAllFullData", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "update", null);
ClientController = __decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Controller('clients'),
    __metadata("design:paramtypes", [clients_service_1.ClientService,
        client_user_registration_service_1.ClientUserRegistrationService])
], ClientController);
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map