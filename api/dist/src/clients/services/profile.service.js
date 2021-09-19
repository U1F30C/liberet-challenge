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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const appointment_model_1 = require("../../appointments/entities/appointment.model");
const error_responses_1 = require("../../utils/error-responses");
const minors_error_codes_1 = require("../constants/minors-error-codes");
const client_model_1 = require("../models/client.model");
const minor_model_1 = require("../models/minor.model");
let ProfileService = class ProfileService {
    constructor(clientModel, minorModel, appointmentModel) {
        this.clientModel = clientModel;
        this.minorModel = minorModel;
        this.appointmentModel = appointmentModel;
    }
    async getProfile(clientId) {
        const client = await this.clientModel.findOne({
            where: {
                userId: clientId,
            },
        });
        const profile = { passport: client ? client.passport : '' };
        return profile;
    }
    async patchProfile(userId, body) {
        await this.clientModel.update({ passport: body.passport }, {
            where: {
                userId: userId,
            },
        });
    }
    async addMinor(minor, userId) {
        minor.clientId = userId;
        await this.validateMinor(minor);
        const createdMinor = await this.minorModel.create(minor);
        return createdMinor;
    }
    async validateMinor(minor) {
        await this.validateDuplicatedMinor(minor);
        await this.validateExistingClient(minor);
    }
    async validateExistingClient(minor) {
        const clientCount = await this.clientModel.count({
            where: {
                curp: minor.curp,
            },
        });
        if (clientCount > 0) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(minors_error_codes_1.MinorAlreadyRegisteredAsClient));
        }
    }
    async validateDuplicatedMinor(minor) {
        const minorCount = await this.minorModel.count({
            where: {
                curp: minor.curp,
                id: {
                    [sequelize_2.Op.ne]: minor.id || 0,
                },
            },
        });
        if (minorCount > 0) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(minors_error_codes_1.MinorAlreadyRegistered));
        }
    }
    async getMinors(userId) {
        const minors = this.minorModel.findAll({
            where: {
                clientId: userId,
            },
        });
        return minors;
    }
    async updateMinor(minor, userId) {
        await this.validateMinor(minor);
        this.validateMinorOwnership(minor, userId);
        await this.minorModel.update(minor, {
            where: {
                id: minor.id,
            },
        });
    }
    async deleteMinor(minorId, userId) {
        await this.validateDeletion(minorId, userId);
        await this.minorModel.destroy({
            where: {
                id: minorId,
            },
        });
    }
    validateMinorOwnership(minor, userId) {
        if (minor.clientId != userId) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(minors_error_codes_1.MinorIsNotYours));
        }
    }
    async validateDeletion(minorId, userId) {
        const minor = await this.minorModel.findOne({
            where: {
                id: minorId,
            },
        });
        if (!minor) {
            throw new common_1.NotFoundException(error_responses_1.createErrorResponse(minors_error_codes_1.MinorNotFound));
        }
        this.validateMinorOwnership(minor, userId);
        await this.validateRelationships(minorId);
    }
    async validateRelationships(minorId) {
        const appointmentCount = await this.appointmentModel.count({
            where: {
                minorId: minorId,
            },
        });
        if (appointmentCount > 0) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(minors_error_codes_1.MinorCannotBeDeleted));
        }
    }
};
ProfileService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(client_model_1.Client)),
    __param(1, sequelize_1.InjectModel(minor_model_1.Minor)),
    __param(2, sequelize_1.InjectModel(appointment_model_1.Appointment)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map