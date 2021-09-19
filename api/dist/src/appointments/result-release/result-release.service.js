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
exports.ResultReleaseService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const sequelize_1 = require("@nestjs/sequelize");
const lodash_1 = require("lodash");
const sequelize_2 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const client_model_1 = require("../../clients/models/client.model");
const minor_model_1 = require("../../clients/models/minor.model");
const application_emails_1 = require("../../shared/email/application-emails");
const time_utils_service_1 = require("../../shared/time/time-utils.service");
const test_result_model_1 = require("../../test-result/entities/test-result.model");
const user_model_1 = require("../../users/models/user.model");
const appointment_states_1 = require("../constants/appointment-states");
const appointment_model_1 = require("../entities/appointment.model");
const payment_model_1 = require("../entities/payment.model");
const test_type_model_1 = require("../entities/test-type.model");
let ResultReleaseService = class ResultReleaseService {
    constructor(appointmentModel, testResultModel, sequelizeInstance, applicationEmails, timeUtils) {
        this.appointmentModel = appointmentModel;
        this.testResultModel = testResultModel;
        this.sequelizeInstance = sequelizeInstance;
        this.applicationEmails = applicationEmails;
        this.timeUtils = timeUtils;
    }
    async triggerResultRelease() {
        try {
            await this.releaseApplicableResults();
        }
        catch (error) {
            console.log(error);
        }
    }
    async releaseApplicableResults() {
        const appointmentsToBeReleased = await this.appointmentModel.findAll({
            attributes: ['code', 'receptionTime'],
            include: [
                {
                    model: test_type_model_1.TestType,
                    required: true,
                },
                {
                    model: minor_model_1.Minor,
                    attributes: ['name', 'lastName', 'mothersLastName', 'fullName'],
                    required: false,
                },
                {
                    model: client_model_1.Client,
                    attributes: ['userId'],
                    include: [
                        {
                            model: user_model_1.User,
                            attributes: [
                                'email',
                                'name',
                                'lastName',
                                'mothersLastName',
                                'fullName',
                            ],
                        },
                    ],
                },
                {
                    model: test_result_model_1.TestResult,
                    where: { ready: true, sent: false },
                    required: true,
                },
                {
                    model: payment_model_1.Payment,
                    where: { status: payment_model_1.PaymentStatuses.Paidout },
                    attributes: ['status'],
                    required: true,
                },
            ],
            where: {
                state: {
                    [sequelize_2.Op.or]: [
                        appointment_states_1.AppointmentStates.PendingResults,
                        appointment_states_1.AppointmentStates.ResultsReady,
                    ],
                },
            },
        });
        const appointmentsDue = appointmentsToBeReleased.filter((appointment) => {
            const releaseTime = Date.parse(appointment.receptionTime) +
                Date.parse(appointment.testType.releaseTimeOffset);
            const now = this.timeUtils.getNow().getTime();
            const due = releaseTime < now;
            return due;
        });
        for (const appointment of appointmentsDue) {
            try {
                await appointment.update({ state: appointment_states_1.AppointmentStates.ResultsDelivered });
                this.sendMail(appointment);
                await this.testResultModel.update({ sent: true }, { where: { testCode: appointment.code } });
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    sendMail(appointment) {
        return this.applicationEmails.sendResults({
            appointment,
            result: lodash_1.head(appointment.results),
            clientUser: appointment.client.user,
            underaged: appointment.minor,
        });
    }
};
__decorate([
    schedule_1.Cron('0 * * * * *', {
        timeZone: 'America/Mexico_City',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResultReleaseService.prototype, "triggerResultRelease", null);
ResultReleaseService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(appointment_model_1.Appointment)),
    __param(1, sequelize_1.InjectModel(test_result_model_1.TestResult)),
    __param(2, common_1.Inject('Sequelize')),
    __metadata("design:paramtypes", [typeof (_a = typeof sequelize_typescript_1.ModelCtor !== "undefined" && sequelize_typescript_1.ModelCtor) === "function" ? _a : Object, typeof (_b = typeof sequelize_typescript_1.ModelCtor !== "undefined" && sequelize_typescript_1.ModelCtor) === "function" ? _b : Object, typeof (_c = typeof sequelize_2.Sequelize !== "undefined" && sequelize_2.Sequelize) === "function" ? _c : Object, application_emails_1.ApplicationEmails,
        time_utils_service_1.TimeUtilsService])
], ResultReleaseService);
exports.ResultReleaseService = ResultReleaseService;
//# sourceMappingURL=result-release.service.js.map