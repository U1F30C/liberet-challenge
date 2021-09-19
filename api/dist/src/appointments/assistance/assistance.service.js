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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistanceService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const base_service_1 = require("../../shared/base/base.service");
const querist_1 = require("../../shared/querying/querist");
const appointment_model_1 = require("../entities/appointment.model");
const consecutive_model_1 = require("../entities/consecutive.model");
const user_model_1 = require("../../users/models/user.model");
const minor_model_1 = require("../../clients/models/minor.model");
const client_model_1 = require("../../clients/models/client.model");
const appointments_service_1 = require("../services/appointments.service");
const appointment_states_1 = require("../constants/appointment-states");
const test_type_model_1 = require("../entities/test-type.model");
let AssistanceService = class AssistanceService extends base_service_1.BaseService {
    constructor(appointmentModel, querist, sequelizeInstance, consecutiveModel, appointmentService) {
        super(appointmentModel, querist);
        this.appointmentModel = appointmentModel;
        this.sequelizeInstance = sequelizeInstance;
        this.consecutiveModel = consecutiveModel;
        this.appointmentService = appointmentService;
    }
    async findAppointmentsDay(query) {
        const appointments = await this.findAll(query, (options) => {
            options.include = [
                {
                    model: minor_model_1.Minor,
                    attributes: ['name', 'lastName', 'mothersLastName', 'fullName'],
                },
                {
                    model: client_model_1.Client,
                    attributes: ['userId'],
                    include: [
                        {
                            model: user_model_1.User,
                            attributes: ['email', 'name', 'lastName', 'fullName'],
                        },
                    ],
                },
                {
                    model: test_type_model_1.TestType,
                    attributes: ['id', 'name']
                },
            ];
            options.where = {
                [sequelize_2.Op.or]: [{ state: appointment_states_1.AppointmentStates.Scheduled }, { state: appointment_states_1.AppointmentStates.PendingResults }, { state: appointment_states_1.AppointmentStates.NotAttended }],
                dateOnly: this.getCurrentDay()
            };
        });
        appointments.elements = appointments.elements.map((appointment) => {
            const appointmentDto = appointment.toJSON();
            return appointmentDto;
        });
        return appointments;
    }
    async findWithMinor(codeTest) {
        const appointments = await this.set.findOne({
            where: {
                code: codeTest
            },
            include: [
                {
                    model: minor_model_1.Minor,
                    attributes: ['name', 'lastName', 'mothersLastName', 'fullName'],
                },
                {
                    model: client_model_1.Client,
                    attributes: ['userId'],
                    include: [
                        {
                            model: user_model_1.User,
                            attributes: ['email', 'name', 'lastName', 'fullName'],
                        },
                    ],
                },
                {
                    model: test_type_model_1.TestType,
                    attributes: ['id', 'name']
                },
            ]
        });
        return appointments;
    }
    async markNonAssistance(testCode) {
        const appointment = await this.set.findByPk(testCode);
        if (!appointment)
            throw new Error('test not found');
        return this.sequelizeInstance.transaction(async (transaction) => {
            await appointment.update({ state: appointment_states_1.AppointmentStates.NotAttended }, { transaction });
        });
    }
    async markAssistance(testCode) {
        const appointment = await this.set.findByPk(testCode);
        if (!appointment)
            throw new Error('test not found');
        return this.sequelizeInstance.transaction(async (transaction) => {
            const time = this.getCurrentDay();
            await appointment.update({ state: appointment_states_1.AppointmentStates.PendingResults, receptionTime: time }, { transaction });
            await this.assignNewNumber(testCode, transaction);
        });
    }
    async assignNewNumber(testCode, transaction) {
        const test = await this.set.findByPk(testCode);
        if (!test)
            throw new Error('test not found');
        let consecutive = await this.consecutiveModel.findOne({
            where: { batch: test.batch, day: this.getCurrentDay() },
        });
        if (!consecutive) {
            consecutive = await this.consecutiveModel.create({
                batch: test.batch,
                day: this.getCurrentDay(),
                current: 0,
            }, { transaction });
        }
        const next = consecutive.current + 1;
        await test.update({ numberTest: next }, { transaction });
        await consecutive.update({ current: next }, { transaction });
    }
    getCurrentDay() {
        const now = new Date();
        const year = now.getFullYear().toString().padStart(4, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
};
AssistanceService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(appointment_model_1.Appointment)),
    __param(2, common_1.Inject('Sequelize')),
    __param(3, sequelize_1.InjectModel(consecutive_model_1.Consecutive)),
    __param(4, sequelize_1.InjectModel(appointment_model_1.Appointment)),
    __metadata("design:paramtypes", [typeof (_a = typeof sequelize_typescript_1.ModelCtor !== "undefined" && sequelize_typescript_1.ModelCtor) === "function" ? _a : Object, querist_1.Querist, typeof (_b = typeof sequelize_2.Sequelize !== "undefined" && sequelize_2.Sequelize) === "function" ? _b : Object, typeof (_c = typeof sequelize_typescript_1.ModelCtor !== "undefined" && sequelize_typescript_1.ModelCtor) === "function" ? _c : Object, appointments_service_1.AppointmentsService])
], AssistanceService);
exports.AssistanceService = AssistanceService;
//# sourceMappingURL=assistance.service.js.map