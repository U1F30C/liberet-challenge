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
exports.emailSender = exports.EmailSender = void 0;
const common_1 = require("@nestjs/common");
const email_templates_1 = __importDefault(require("email-templates"));
const nodemailer_1 = require("nodemailer");
const path_1 = __importDefault(require("path"));
const bootstrap_config_service_1 = require("../../utils/bootstrap-config-service");
let EmailSender = class EmailSender {
    constructor() {
        this.transporter = nodemailer_1.createTransport({
            host: bootstrap_config_service_1.appConfig.get('SMTP_HOST'),
            port: +bootstrap_config_service_1.appConfig.get('SMTP_PORT'),
            secure: false,
            from: `${bootstrap_config_service_1.appConfig.get('SMTP_NO_REPLY_DISPLAY_NAME')} <${bootstrap_config_service_1.appConfig.get('SMTP_FROM_EMAIL')}>`,
            auth: {
                user: bootstrap_config_service_1.appConfig.get('SMTP_NO_REPLY_MAIL'),
                pass: bootstrap_config_service_1.appConfig.get('SMTP_NO_REPLY_MAIL_PASS'),
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }
    async sendMail(to, template, locals, attachments) {
        const sendMail = bootstrap_config_service_1.appConfig.get('SEND_MAIL') === 'true';
        const showPreview = bootstrap_config_service_1.appConfig.get('SHOW_EMAIL_PREVIEW') === 'true';
        const templatePath = path_1.default.join(__dirname, 'emails', template);
        let email = new email_templates_1.default({
            send: sendMail,
            preview: showPreview,
            transport: this.transporter,
            juiceResources: {
                webResources: {
                    relativeTo: templatePath,
                },
            },
            message: undefined,
        });
        try {
            await email.send({
                template,
                message: {
                    to,
                    from: bootstrap_config_service_1.appConfig.get('SMTP_FROM_EMAIL'),
                    attachments: attachments,
                },
                locals,
            });
        }
        catch (exception) {
            console.log(exception);
        }
    }
};
EmailSender = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], EmailSender);
exports.EmailSender = EmailSender;
exports.emailSender = new EmailSender();
//# sourceMappingURL=email-sender.service.js.map