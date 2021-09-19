"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const _ = __importStar(require("lodash"));
const lodash_1 = require("lodash");
const appointment_model_1 = require("../../appointments/entities/appointment.model");
const test_type_model_1 = require("../../appointments/entities/test-type.model");
const country_model_1 = require("../../geography/models/country.model");
const municipality_model_1 = require("../../geography/models/municipality.model");
const nationality_model_1 = require("../../geography/models/nationality.model");
const state_model_1 = require("../../geography/models/state.model");
const base_service_1 = require("../../shared/base/base.service");
const querist_1 = require("../../shared/querying/querist");
const test_result_model_1 = require("../../test-result/entities/test-result.model");
const udg_codes_model_1 = require("../../users/models/udg-codes.model");
const user_model_1 = require("../../users/models/user.model");
const registration_error_codes_1 = require("../constants/registration-error-codes");
const address_model_1 = require("../models/address.model");
const client_model_1 = require("../models/client.model");
const minor_model_1 = require("../models/minor.model");
const dataToUpdate = ['name', 'lastName', 'email', 'role', 'active'];
let ClientService = class ClientService extends base_service_1.BaseService {
    constructor(clientModel, querist) {
        super(clientModel, querist);
        this.toDto = this.toDto.bind(this);
    }
    update(clientId, newData) {
        const newDataMaksApplied = _.pick(newData, dataToUpdate);
        return super.update(clientId, newDataMaksApplied);
    }
    async insert(toInsert) {
        let alreadyExistingClient = await this.findClientByUserId(toInsert.userId);
        if (alreadyExistingClient) {
            throw new Error(registration_error_codes_1.AlreadyExistingClient);
        }
        return super.insert(toInsert, {
            include: {
                model: address_model_1.Address,
            },
        });
    }
    async findClientByUserId(userId) {
        let result = await this.set.findOne({
            where: {
                userId: userId,
            },
            include: [
                {
                    model: user_model_1.User,
                    attributes: [
                        'name',
                        'lastName',
                        'mothersLastName',
                        'fullName',
                        'email',
                    ],
                    required: true,
                },
                { model: country_model_1.Country },
                { model: nationality_model_1.Nationality },
            ],
        });
        return result;
    }
    async findClientByUserIdExpand(userId) {
        let result = await this.set.findOne({
            where: {
                userId: userId,
            },
            include: [
                {
                    model: user_model_1.User,
                    attributes: [
                        'name',
                        'lastName',
                        'mothersLastName',
                        'fullName',
                        'email',
                    ],
                    required: true,
                    include: [{ model: udg_codes_model_1.UdgCode }],
                },
                { model: country_model_1.Country },
                { model: nationality_model_1.Nationality },
                {
                    model: address_model_1.Address,
                    include: [{ model: municipality_model_1.Municipality }, { model: state_model_1.State }],
                },
                {
                    model: appointment_model_1.Appointment,
                    include: [
                        { model: test_type_model_1.TestType },
                        {
                            model: minor_model_1.Minor,
                            attributes: [
                                'name',
                                'lastName',
                                'mothersLastName',
                                'fullName',
                            ],
                        },
                    ],
                },
            ],
        });
        if (!result)
            throw new common_1.NotFoundException();
        return this.toDto(result);
    }
    findAllWithFullData(query) {
        return this.findAll(query, (options) => {
            options.include = [
                {
                    model: user_model_1.User,
                    attributes: [
                        'name',
                        'lastName',
                        'mothersLastName',
                        'fullName',
                        'email',
                    ],
                    required: true,
                },
            ];
        }).then((paginatedData) => {
            paginatedData.elements = paginatedData.elements.map(this.toDto);
            return paginatedData;
        });
    }
    toDto(client) {
        var _a;
        const clientDto = client.toJSON();
        lodash_1.assignIn(clientDto, (_a = client.user) === null || _a === void 0 ? void 0 : _a.toJSON());
        delete clientDto.user;
        clientDto.id = client.userId;
        delete clientDto.userId;
        if (client.birthDate)
            clientDto.age = this.calculateAge(new Date(client.birthDate));
        if (clientDto.appointments)
            clientDto.appointments.forEach((appointment) => {
                if (appointment.minor != null) {
                    appointment.patient = { fullName: appointment.minor.fullName };
                }
                else {
                    appointment.patient = { fullName: clientDto.fullName };
                }
            });
        return clientDto;
    }
    calculateAge(birthday) {
        let ageDifMs = Date.now() - birthday.getTime();
        let ageDate = new Date(ageDifMs);
        let age = ageDate.getUTCFullYear() - 1970;
        return age > 0 ? age : 0;
    }
};
ClientService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(client_model_1.Client)),
    __metadata("design:paramtypes", [Object, querist_1.Querist])
], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=clients.service.js.map