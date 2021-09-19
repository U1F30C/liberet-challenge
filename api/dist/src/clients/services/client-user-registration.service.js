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
exports.ClientUserRegistrationService = void 0;
const common_1 = require("@nestjs/common");
const roles_1 = require("../../constants/roles");
const application_emails_1 = require("../../shared/email/application-emails");
const udg_codes_model_1 = require("../../users/models/udg-codes.model");
const user_model_1 = require("../../users/models/user.model");
const users_service_1 = require("../../users/users.service");
const error_responses_1 = require("../../utils/error-responses");
const registration_error_codes_1 = require("../constants/registration-error-codes");
const set_password_token_service_1 = require("./set-password-token.service");
const bcrypt_1 = require("bcrypt");
const sequelize_1 = require("@nestjs/sequelize");
let ClientUserRegistrationService = class ClientUserRegistrationService {
    constructor(userModel, userService, applicationEmails, passwordTokenService) {
        this.userModel = userModel;
        this.userService = userService;
        this.applicationEmails = applicationEmails;
        this.passwordTokenService = passwordTokenService;
    }
    async registerUser(user) {
        let result = {
            validationRequired: false,
            user: null,
        };
        let previousUser = await this.fetchUser(user.email);
        result.validationRequired = !previousUser || !previousUser.isEmailValidated;
        if (!previousUser) {
            let created = await this.userService.insert(Object.assign(Object.assign({}, user), { active: true, role: roles_1.Roles.Client, isEmailValidated: false }), {
                include: {
                    model: udg_codes_model_1.UdgCode,
                },
            });
            result.user = created;
        }
        else {
            let existingUdgCode = await this.userService.getUdgCode(previousUser.id);
            if (user.udgCode && !existingUdgCode) {
                await this.userService.setUdgCodeToUser(previousUser.id, user.udgCode);
            }
            result.user = previousUser;
        }
        return result;
    }
    async fetchUser(email) {
        try {
            let user = await this.userService.findOneByEmail(email);
            return user;
        }
        catch (exception) {
            if (exception instanceof common_1.NotFoundException) {
                return null;
            }
            throw exception;
        }
    }
    async beginVerificationProcess(user) {
        await this.sendVerificationEmail(user);
    }
    async sendVerificationEmail(user) {
        let token = await this.generateToken(user.id);
        await this.applicationEmails.sendToSetPassword({
            email: user.email,
            token: token,
            userDisplayName: user.name + ' ' + user.lastName,
        });
    }
    async generateToken(userId) {
        return await this.passwordTokenService.createNewToken(userId);
    }
    async setPassword(setPasswordModel) {
        let tokenObject = await this.passwordTokenService.getTokenObject(setPasswordModel.token);
        let isValid = await this.passwordTokenService.isTokenValid(tokenObject);
        if (!isValid) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(registration_error_codes_1.InvalidToken));
        }
        const password = await bcrypt_1.hash(setPasswordModel.password, 10);
        await this.userModel.update({
            password: password,
            isEmailValidated: true,
        }, {
            where: {
                id: tokenObject.userId,
            },
        });
        await this.passwordTokenService.invalidateToken(tokenObject.id);
    }
};
ClientUserRegistrationService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(user_model_1.User)),
    __metadata("design:paramtypes", [Object, users_service_1.UsersService,
        application_emails_1.ApplicationEmails,
        set_password_token_service_1.PasswordTokenService])
], ClientUserRegistrationService);
exports.ClientUserRegistrationService = ClientUserRegistrationService;
//# sourceMappingURL=client-user-registration.service.js.map