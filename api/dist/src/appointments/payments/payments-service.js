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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const decimal_js_1 = require("decimal.js");
const sequelize_typescript_1 = require("sequelize-typescript");
const client_model_1 = require("../../clients/models/client.model");
const assets_service_service_1 = require("../../shared/assets-service/assets-service.service");
const base_service_1 = require("../../shared/base/base.service");
const pdf_service_1 = require("../../shared/pdf/pdf.service");
const querist_1 = require("../../shared/querying/querist");
const udg_codes_model_1 = require("../../users/models/udg-codes.model");
const user_model_1 = require("../../users/models/user.model");
const appointment_model_1 = require("../entities/appointment.model");
const payment_model_1 = require("../entities/payment.model");
const test_type_model_1 = require("../entities/test-type.model");
let PaymentsService = class PaymentsService extends base_service_1.BaseService {
    constructor(testTypeModel, querist, appointmentModel, pdfService) {
        super(testTypeModel, querist);
        this.appointmentModel = appointmentModel;
        this.pdfService = pdfService;
    }
    async getAppointmentForPaymentInfo(appointmentCode) {
        const appointment = await this.appointmentModel.findByPk(appointmentCode, {
            include: [
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
        if (!appointment) {
            throw new common_1.NotFoundException();
        }
        return appointment;
    }
    formatAmountWithCurrency(amount) {
        return '$' + amount.toFixed(2).toString();
    }
    async getAppointmentCost(appointment) {
        const testPrice = new decimal_js_1.Decimal(appointment.testType.price);
        let discountPercentage = 0;
        if (appointment.client.user.udgCode) {
            discountPercentage = 10;
        }
        const discountAmount = testPrice.mul(discountPercentage).div(100);
        const vatRate = 15;
        const subtotal = testPrice.minus(discountAmount);
        const vatAmount = subtotal.mul(vatRate).div(100);
        const total = subtotal.plus(vatAmount);
        return {
            testPrice: this.formatAmountWithCurrency(testPrice),
            discountPercentage: discountPercentage,
            vatRate: vatRate,
            vatAmount: this.formatAmountWithCurrency(vatAmount),
            discountAmount: this.formatAmountWithCurrency(discountAmount),
            subtotal: this.formatAmountWithCurrency(subtotal),
            total: this.formatAmountWithCurrency(total),
        };
    }
    async getPaymentDocument(appointmentCode) {
        const appointment = await this.getAppointmentForPaymentInfo(appointmentCode);
        const costData = await this.getAppointmentCost(appointment);
        const fileStream = await this.pdfService.renderPdf('payment-document', Object.assign(Object.assign({}, this.getPaymentDocumentData()), { testName: appointment.testType.name, fullName: appointment.client.user.fullName, subtotal: costData.subtotal, vatAmount: costData.vatAmount, totalCost: costData.total }));
        return fileStream;
    }
    getPaymentDocumentData() {
        return {
            reference: '90000222035',
            numericCode: '04-0032',
            banks: [
                {
                    logoPath: 'https://www.telefonoysucursales.com/wp-content/uploads/2018/06/banorte-logo-1024x308.jpg',
                    data: 'EMISORA 03169',
                },
                {
                    logoPath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyC7JawGNux4CKCBcohIA0RwjXRj-EDd4jmHKHHMuDsdQRhhkht3dzlBC6qlKFXuCvRvw&usqp=CAU',
                    data: 'CLAVE 4038\nOPTRXN5503',
                },
                {
                    logoPath: 'https://index.impakter.com/wp-content/uploads/2020/11/Santander-Logo.png',
                    data: 'CLIENTE No. 0531',
                },
                {
                    logoPath: 'https://contextodedurango.com.mx/noticias/wp-content/uploads/2019/02/Sucursales-BBVA-Bancomer-en-queretaro-1024x384.jpg',
                    data: 'CONVENIO CIE 588313',
                },
                {
                    logoPath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJl4bZh0A4-tGp0pyKlsss7kC7FMcLGGFqVQ6cWb8MzyacNkrt-eaDwZjmBoGYIR3cG5M&usqp=CAU',
                    data: 'PA: 3015508395',
                },
                {
                    logoPath: 'https://cocep.org.pe/wp-content/uploads/2018/06/ScotiabankCorporativo-rojo-01.png',
                    data: '3547',
                },
            ],
        };
    }
};
PaymentsService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(payment_model_1.Payment)),
    __param(2, sequelize_1.InjectModel(appointment_model_1.Appointment)),
    __metadata("design:paramtypes", [typeof (_a = typeof sequelize_typescript_1.ModelCtor !== "undefined" && sequelize_typescript_1.ModelCtor) === "function" ? _a : Object, querist_1.Querist, typeof (_b = typeof sequelize_typescript_1.ModelCtor !== "undefined" && sequelize_typescript_1.ModelCtor) === "function" ? _b : Object, pdf_service_1.PdfService])
], PaymentsService);
exports.PaymentsService = PaymentsService;
//# sourceMappingURL=payments-service.js.map