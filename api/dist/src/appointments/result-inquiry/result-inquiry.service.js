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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultInquiryService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const date_fns_1 = require("date-fns");
const lodash_1 = require("lodash");
const sequelize_typescript_1 = require("sequelize-typescript");
const client_model_1 = require("../../clients/models/client.model");
const minor_model_1 = require("../../clients/models/minor.model");
const sexes_1 = require("../../constants/sexes");
const assets_service_service_1 = require("../../shared/assets-service/assets-service.service");
const pdf_service_1 = require("../../shared/pdf/pdf.service");
const test_result_model_1 = require("../../test-result/entities/test-result.model");
const udg_codes_model_1 = require("../../users/models/udg-codes.model");
const user_model_1 = require("../../users/models/user.model");
const appointment_model_1 = require("../entities/appointment.model");
const test_type_model_1 = require("../entities/test-type.model");
let ResultInquiryService = class ResultInquiryService {
    constructor(appointmentModel, pdfService, assetsServiceService) {
        this.appointmentModel = appointmentModel;
        this.pdfService = pdfService;
        this.assetsServiceService = assetsServiceService;
    }
    async getResult(appointmentCode) {
        const appointment = await this.appointmentModel.findByPk(appointmentCode, {
            include: [
                { model: minor_model_1.Minor, required: false },
                { model: test_result_model_1.TestResult, required: true, where: { ready: true } },
                { model: test_type_model_1.TestType, required: true },
                {
                    model: client_model_1.Client,
                    include: [
                        {
                            model: user_model_1.User,
                            required: true,
                            include: [{ model: udg_codes_model_1.UdgCode, required: false }],
                        },
                    ],
                    required: true,
                },
            ],
        });
        let patient;
        if (!appointment)
            throw new common_1.NotFoundException();
        if (appointment.minor) {
            patient = appointment.minor;
        }
        else {
            patient = {
                fullName: appointment.client.user.fullName,
                birthDate: appointment.client.birthDate,
                sex: appointment.client.sex,
                passport: appointment.client.passport,
            };
        }
        const receptionTime = new Date(appointment.receptionTime);
        patient.age = this.calculateAge(new Date(patient.birthDate), receptionTime);
        const resultData = lodash_1.head(appointment.results).resultData;
        const fileStream = await this.pdfService.renderPdf('test-result', {
            patientFullName: lodash_1.toUpper(patient.fullName),
            testCode: appointment.code,
            passportCode: patient.passport,
            patientAge: patient.age,
            patientSex: patient.sex,
            samplingDay: date_fns_1.format(receptionTime, 'dd/MM/yyyy'),
            samplingTime: date_fns_1.format(receptionTime, 'HH:mm'),
            testType: appointment.testType.name,
            technique: resultData.technique,
            sampleType: resultData.sampleType,
            result: resultData.isPositive,
            udgImageSrc: await this.assetsServiceService.readImageGetBase64ForHtml('pdfs/assets/udg_cucei_white_transparent.png', 'png'),
            ladimLogo: await this.assetsServiceService.readImageGetBase64ForHtml('pdfs/assets/ladim_logo_transparent.png', 'png'),
            supervisor: {
                name: resultData.supervisorName,
                data: resultData.supervisorData,
            },
        }, false);
        return fileStream;
    }
    calculateAge(birthday, atTime) {
        let ageDifMs = atTime.getTime() - birthday.getTime();
        let ageDate = new Date(ageDifMs);
        let age = ageDate.getUTCFullYear() - 1970;
        return age > 0 ? age : 0;
    }
};
ResultInquiryService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(appointment_model_1.Appointment)),
    __metadata("design:paramtypes", [typeof (_a = typeof sequelize_typescript_1.ModelCtor !== "undefined" && sequelize_typescript_1.ModelCtor) === "function" ? _a : Object, pdf_service_1.PdfService,
        assets_service_service_1.AssetsServiceService])
], ResultInquiryService);
exports.ResultInquiryService = ResultInquiryService;
//# sourceMappingURL=result-inquiry.service.js.map