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
exports.PasswordTokenService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const set_password_token_model_1 = require("../models/set-password-token.model");
const uuid_1 = require("uuid");
const bootstrap_config_service_1 = require("../../utils/bootstrap-config-service");
const time_utils_service_1 = require("../../shared/time/time-utils.service");
let PasswordTokenService = class PasswordTokenService {
    constructor(setPasswordTokenModel, timeUtils) {
        this.setPasswordTokenModel = setPasswordTokenModel;
        this.timeUtils = timeUtils;
    }
    async createNewToken(userId) {
        let tokenDurationInSeconds = bootstrap_config_service_1.appConfig.getNumber('SET_PASSWORD_TOKEN_DURATION_IN_SECONDS', 3600);
        await this.removePreviousTokens(userId);
        let created = await this.setPasswordTokenModel.create({
            isValid: true,
            token: uuid_1.v4(),
            validUntil: new Date(this.timeUtils.getNow().getTime() + tokenDurationInSeconds * 1000),
            userId: userId,
        });
        return created.token;
    }
    removePreviousTokens(userId) {
        return this.setPasswordTokenModel.destroy({
            where: {
                userId: userId,
            },
        });
    }
    async getTokenObject(tokenString) {
        let token = await this.setPasswordTokenModel.findOne({
            where: {
                token: tokenString,
            },
        });
        return token;
    }
    async isTokenValid(token) {
        if (!token) {
            return false;
        }
        let hasExpired = await this.hasExpired(token);
        return token.isValid && !hasExpired;
    }
    async hasExpired(token) {
        let validUntil = new Date(token.validUntil);
        return this.timeUtils.getNow() > validUntil;
    }
    async setTokenAsInvalid(tokenString) {
        this.setPasswordTokenModel.update({
            isValid: false,
        }, {
            where: {
                token: tokenString,
            },
        });
    }
    async invalidateToken(tokenId) {
        await this.setPasswordTokenModel.destroy({
            where: {
                id: tokenId,
            },
        });
    }
};
PasswordTokenService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(set_password_token_model_1.SetPasswordToken)),
    __metadata("design:paramtypes", [Object, time_utils_service_1.TimeUtilsService])
], PasswordTokenService);
exports.PasswordTokenService = PasswordTokenService;
//# sourceMappingURL=set-password-token.service.js.map