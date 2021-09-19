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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const date_fns_1 = require("date-fns");
const sequelize_2 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const client_model_1 = require("../../clients/models/client.model");
const minor_model_1 = require("../../clients/models/minor.model");
const country_model_1 = require("../../geography/models/country.model");
const nationality_model_1 = require("../../geography/models/nationality.model");
const assets_service_service_1 = require("../../shared/assets-service/assets-service.service");
const base_service_1 = require("../../shared/base/base.service");
const application_emails_1 = require("../../shared/email/application-emails");
const pdf_service_1 = require("../../shared/pdf/pdf.service");
const querist_1 = require("../../shared/querying/querist");
const time_utils_service_1 = require("../../shared/time/time-utils.service");
const test_result_model_1 = require("../../test-result/entities/test-result.model");
const user_model_1 = require("../../users/models/user.model");
const appointment_states_1 = require("../constants/appointment-states");
const appointment_model_1 = require("../entities/appointment.model");
const consecutive_model_1 = require("../entities/consecutive.model");
const file_model_1 = require("../entities/file.model");
const payment_model_1 = require("../entities/payment.model");
const test_type_model_1 = require("../entities/test-type.model");
let AppointmentsService = class AppointmentsService extends base_service_1.BaseService {
    constructor(appointmentModel, querist, consecutiveModel, timeUtils, emails, pdfService, assetsServiceService) {
        super(appointmentModel, querist);
        this.consecutiveModel = consecutiveModel;
        this.timeUtils = timeUtils;
        this.emails = emails;
        this.pdfService = pdfService;
        this.assetsServiceService = assetsServiceService;
    }
    async findOneByCode(code) {
        const appointment = await this.set.findOne({
            where: { code },
        });
        if (!appointment)
            throw new common_1.NotFoundException();
        return appointment;
    }
    async findOneByCodeExpand(code) {
        const appointment = await this.set.findOne({
            where: { code },
            include: [
                { model: client_model_1.Client },
                { model: test_type_model_1.TestType },
                {
                    model: payment_model_1.Payment,
                    include: [
                        { model: file_model_1.ProofOfPayment, attributes: ['proofOfPaymentStatus'] },
                    ],
                },
            ],
        });
        if (!appointment)
            throw new common_1.NotFoundException();
        return appointment;
    }
    async findWithResult(query) {
        const appointments = await this.findAll(query, (options) => {
            options.attributes = ['code', 'batch'];
            options.include = [
                {
                    model: test_result_model_1.TestResult,
                    required: false,
                    where: { discarded: false },
                },
                {
                    model: test_type_model_1.TestType,
                    required: true,
                },
            ];
            options.subQuery = false;
            options.where = {
                state: appointment_states_1.AppointmentStates.PendingResults,
                [sequelize_2.Op.and]: [{ '$results.ready$': { [sequelize_2.Op.not]: true } }, options.where],
            };
        });
        appointments.elements = appointments.elements.map((appointment) => {
            const appointmentDto = appointment.toJSON();
            appointmentDto.result = appointment.results.find((result) => !result.discarded);
            return appointmentDto;
        });
        return appointments;
    }
    async findForFinanceUser(query) {
        const appointments = await this.findAll(query, (options) => {
            options.include = [{ model: payment_model_1.Payment }, { model: test_type_model_1.TestType }];
            options.order = [['date', 'DESC']];
        });
        return appointments;
    }
    getCurrentDay() {
        const now = this.timeUtils.getNow();
        const year = now.getFullYear().toString().padStart(4, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
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
    async getAppointmentInfoFileData(testCode) {
        const appointment = await this.set.findOne({
            where: { code: testCode },
            include: [
                { model: test_type_model_1.TestType },
                {
                    model: minor_model_1.Minor,
                    attributes: ['name', 'lastName', 'mothersLastName', 'fullName'],
                },
                {
                    model: client_model_1.Client,
                    attributes: ['userId'],
                    include: [
                        { model: country_model_1.Country },
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
            ],
            attributes: ['code', 'date'],
        });
        if (!appointment)
            throw new common_1.NotFoundException();
        let patient;
        if (appointment.minor)
            patient = appointment.minor;
        else
            patient = appointment.client.user;
        return { appointment, patient };
    }
    async renderAppointmentInformationFile(data) {
        var _a;
        const purpose = 'appointment-information';
        const testTypeName = (_a = data.appointment.testType) === null || _a === void 0 ? void 0 : _a.name;
        const date = date_fns_1.format(data.appointment.date, 'dd/MM/yy HH:mm');
        const procedence = data.procedence;
        const deliveryTime = 'PENDING';
        const testCode = data.appointment.code;
        const file = await this.pdfService.renderPdf(purpose, {
            patientFullName: data.patientFullName,
            procedence,
            testTypeName,
            date,
            deliveryTime,
            testCode,
            udgImageSrc: await this.assetsServiceService.readImageGetBase64ForHtml('pdfs/assets/udg_cucei_white_transparent.png', 'png'),
            ladimLogo: await this.assetsServiceService.readImageGetBase64ForHtml('pdfs/assets/ladim_logo_transparent.png', 'png'),
            ladimMap: await this.assetsServiceService.readImageGetBase64ForHtml('pdfs/assets/ladim_map.jpg', 'jpg'),
        }, false);
        return file;
    }
    async sendAppointmentInformationEmail(testCode) {
        const { appointment, patient } = await this.getAppointmentInfoFileData(testCode);
        const file = await this.renderAppointmentInformationFile({
            user: {
                email: appointment.client.user.email,
                fullName: appointment.client.user.fullName,
            },
            patientFullName: patient.fullName,
            procedence: appointment.client.originCountry.name,
            appointment,
        });
        return this.emails.sendAppointmentInfo({
            user: {
                email: appointment.client.user.email,
                fullName: appointment.client.user.fullName,
            },
            patientFullName: patient.fullName,
            appointment,
            file,
        });
    }
};
AppointmentsService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(appointment_model_1.Appointment)),
    __param(2, sequelize_1.InjectModel(consecutive_model_1.Consecutive)),
    __metadata("design:paramtypes", [typeof (_a = typeof sequelize_typescript_1.ModelCtor !== "undefined" && sequelize_typescript_1.ModelCtor) === "function" ? _a : Object, querist_1.Querist, typeof (_b = typeof sequelize_typescript_1.ModelCtor !== "undefined" && sequelize_typescript_1.ModelCtor) === "function" ? _b : Object, time_utils_service_1.TimeUtilsService,
        application_emails_1.ApplicationEmails,
        pdf_service_1.PdfService,
        assets_service_service_1.AssetsServiceService])
], AppointmentsService);
exports.AppointmentsService = AppointmentsService;
//# sourceMappingURL=appointments.service.js.map