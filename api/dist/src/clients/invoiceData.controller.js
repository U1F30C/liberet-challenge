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
exports.InvoiceDataController = void 0;
const common_1 = require("@nestjs/common");
const querist_1 = require("../shared/querying/querist");
const invoiceData_service_1 = require("./services/invoiceData.service");
let InvoiceDataController = class InvoiceDataController {
    constructor(invoiceDataService) {
        this.invoiceDataService = invoiceDataService;
    }
    async create(invoiceData) {
        const createdInvoiceData = await this.invoiceDataService.createInvoiceData(invoiceData);
        if (createdInvoiceData) {
            return {
                validationRequired: true,
                invoiceData: createdInvoiceData
            };
        }
        return createdInvoiceData;
    }
    async findOneByClient(clientId) {
        return this.invoiceDataService.findByClient(+clientId);
    }
    async update(id, invoiceData) {
        const updateInvoiceData = this.invoiceDataService.updateInvoiceData(id, invoiceData);
        return updateInvoiceData;
    }
    remove(id) {
        return this.invoiceDataService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvoiceDataController.prototype, "create", null);
__decorate([
    common_1.Get(':clientId'),
    __param(0, common_1.Param('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoiceDataController.prototype, "findOneByClient", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], InvoiceDataController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoiceDataController.prototype, "remove", null);
InvoiceDataController = __decorate([
    common_1.Controller('invoice-data'),
    __metadata("design:paramtypes", [invoiceData_service_1.InvoiceDataService])
], InvoiceDataController);
exports.InvoiceDataController = InvoiceDataController;
//# sourceMappingURL=invoiceData.controller.js.map