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
exports.InvoiceDataService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const base_service_1 = require("../../shared/base/base.service");
const querist_1 = require("../../shared/querying/querist");
const billing_data_model_1 = require("../../appointments/entities/billing-data.model");
const registration_error_codes_1 = require("../constants/registration-error-codes");
let InvoiceDataService = class InvoiceDataService extends base_service_1.BaseService {
    constructor(billingDataModel, querist) {
        super(billingDataModel, querist);
        this.billingDataModel = billingDataModel;
    }
    async createInvoiceData(invoiceData) {
        const alreadyExisting = await this.findOneByRFC(invoiceData.rfc);
        if (alreadyExisting)
            return registration_error_codes_1.AlreadyExistingInvoice;
        else
            return this.insert(invoiceData);
    }
    async findByClient(clientId) {
        const invoiceData = await this.set.findAll({
            where: {
                clientId: clientId
            }
        });
        return invoiceData;
    }
    async findOneByRFC(rfc) {
        const invoiceData = await this.set.findOne({
            where: {
                rfc: rfc
            }
        });
        return invoiceData;
    }
    async updateInvoiceData(id, invoiceData) {
        return this.set.update(invoiceData, {
            where: {
                id: id,
            },
        });
    }
    remove(invoiceDataId) {
        this.set.destroy({
            where: {
                id: invoiceDataId
            }
        });
    }
};
InvoiceDataService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(billing_data_model_1.BillingData)),
    __metadata("design:paramtypes", [Object, querist_1.Querist])
], InvoiceDataService);
exports.InvoiceDataService = InvoiceDataService;
//# sourceMappingURL=invoiceData.service.js.map