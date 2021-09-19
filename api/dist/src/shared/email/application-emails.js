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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationEmails = void 0;
const common_1 = require("@nestjs/common");
const appointment_model_1 = require("../../appointments/entities/appointment.model");
const minor_model_1 = require("../../clients/models/minor.model");
const test_result_model_1 = require("../../test-result/entities/test-result.model");
const user_model_1 = require("../../users/models/user.model");
const url_join_1 = __importDefault(require("url-join"));
const bootstrap_config_service_1 = require("../../utils/bootstrap-config-service");
const assets_service_service_1 = require("../assets-service/assets-service.service");
const email_sender_service_1 = require("./email-sender.service");
let ApplicationEmails = class ApplicationEmails {
    constructor(assetsServiceService) {
        this.assetsServiceService = assetsServiceService;
    }
    async sendResults(data) {
        const purpose = 'send-results';
        const email = data.clientUser.email;
        const isPositive = data.result.resultData.isPositive;
        const { fullName: clientFullName } = data.clientUser;
        let patientName;
        if (data.underaged) {
            patientName = data.underaged.fullName;
        }
        else {
            patientName = clientFullName;
        }
        const appLogoUrl = bootstrap_config_service_1.appConfig.get('APP_LOGO_URL');
        await email_sender_service_1.emailSender.sendMail(email, purpose, {
            testCode: data.appointment.code,
            isPositive,
            patientName,
            clientFullName,
            clientOrigin: bootstrap_config_service_1.appConfig.get('CLIENT_ORIGIN'),
            appLogoUrl,
        });
    }
    async sendToSetPassword(data) {
        const purpose = 'set-password';
        const verificationUrl = url_join_1.default(bootstrap_config_service_1.appConfig.get('CLIENT_ORIGIN'), bootstrap_config_service_1.appConfig.get('ESTABLISH_PASSWORD_CLIENT_ROUTE'), data.token);
        const appLogoUrl = bootstrap_config_service_1.appConfig.get('APP_LOGO_URL');
        await email_sender_service_1.emailSender.sendMail(data.email, purpose, {
            userDisplayName: data.userDisplayName,
            verificationUrl,
            clientOrigin: bootstrap_config_service_1.appConfig.get('CLIENT_ORIGIN'),
            appLogoUrl,
        });
    }
    async sendAppointmentInfo(data) {
        const purpose = 'appointment-information';
        const testCode = data.appointment.code;
        await email_sender_service_1.emailSender.sendMail(data.user.email, purpose, {
            clientFullName: data.user.fullName,
            clientOrigin: bootstrap_config_service_1.appConfig.get('CLIENT_ORIGIN'),
        }, [
            {
                filename: `cita_${data.patientFullName}_${testCode}.pdf`,
                content: data.file,
            },
        ]);
    }
    async sendToNotifyPaymentReview(data) {
        const purpose = 'payment-review';
        const appLogoUrl = bootstrap_config_service_1.appConfig.get('APP_LOGO_URL');
        await email_sender_service_1.emailSender.sendMail(data.email, purpose, {
            clientFullName: data.clientFullName,
            status: data.status,
            clientOrigin: bootstrap_config_service_1.appConfig.get('CLIENT_ORIGIN'),
            appLogoUrl,
        });
    }
};
ApplicationEmails = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [assets_service_service_1.AssetsServiceService])
], ApplicationEmails);
exports.ApplicationEmails = ApplicationEmails;
//# sourceMappingURL=application-emails.js.map