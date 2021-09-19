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
exports.PublicClientController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const error_responses_1 = require("../utils/error-responses");
const registration_error_codes_1 = require("./constants/registration-error-codes");
const client_registration_dto_1 = require("./dtos/client-registration-dto");
const client_user_registration_service_1 = require("./services/client-user-registration.service");
const clients_service_1 = require("./services/clients.service");
const set_password_token_service_1 = require("./services/set-password-token.service");
let PublicClientController = class PublicClientController {
    constructor(clientService, clientUserRegistrationService, userService, setPasswordTokenService) {
        this.clientService = clientService;
        this.clientUserRegistrationService = clientUserRegistrationService;
        this.userService = userService;
        this.setPasswordTokenService = setPasswordTokenService;
    }
    async create(registerModel) {
        const registrationResult = await this.clientUserRegistrationService.registerUser(registerModel.user);
        registerModel.client.userId = registrationResult.user.id;
        let createdClient = null;
        try {
            createdClient = await this.clientService.insert(registerModel.client);
            return {
                validationRequired: registrationResult.validationRequired,
                client: createdClient,
            };
        }
        catch (exception) {
            if (exception instanceof Error &&
                exception.message == registration_error_codes_1.AlreadyExistingClient) {
                if (registrationResult.validationRequired) {
                    return {
                        validationRequired: registrationResult.validationRequired,
                        client: createdClient,
                    };
                }
                throw new common_1.BadRequestException(error_responses_1.createErrorResponse(registration_error_codes_1.AlreadyExistingClient));
            }
            throw exception;
        }
    }
    async sendVerificationEmail(verificationEmail) {
        try {
            let user = await this.userService.findOneByEmail(verificationEmail.email);
            this.clientUserRegistrationService.beginVerificationProcess(user);
        }
        catch (example) {
            if (example instanceof common_1.NotFoundException) {
                throw new common_1.BadRequestException(error_responses_1.createErrorResponse(registration_error_codes_1.EmailDoesNotExists));
            }
            else {
                throw example;
            }
        }
    }
    async verifyToken(token) {
        let tokenObject = await this.setPasswordTokenService.getTokenObject(token);
        return {
            isValid: await this.setPasswordTokenService.isTokenValid(tokenObject),
        };
    }
    async setPassword(setPasswordMode) {
        await this.clientUserRegistrationService.setPassword(setPasswordMode);
    }
};
__decorate([
    common_1.UsePipes(new common_1.ValidationPipe()),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_registration_dto_1.ClientRegistrationDTO]),
    __metadata("design:returntype", Promise)
], PublicClientController.prototype, "create", null);
__decorate([
    common_1.Post('verification-email'),
    common_1.HttpCode(200),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicClientController.prototype, "sendVerificationEmail", null);
__decorate([
    common_1.Get('verify-token'),
    __param(0, common_1.Query('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicClientController.prototype, "verifyToken", null);
__decorate([
    common_1.Post('set-password'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicClientController.prototype, "setPassword", null);
PublicClientController = __decorate([
    common_1.Controller('public-clients'),
    __metadata("design:paramtypes", [clients_service_1.ClientService,
        client_user_registration_service_1.ClientUserRegistrationService,
        users_service_1.UsersService,
        set_password_token_service_1.PasswordTokenService])
], PublicClientController);
exports.PublicClientController = PublicClientController;
//# sourceMappingURL=public-client.controller.js.map