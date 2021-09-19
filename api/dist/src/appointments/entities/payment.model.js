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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.PaymentStatuses = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const payment_methods_1 = require("../constants/payment-methods");
const file_model_1 = require("./file.model");
var PaymentStatuses;
(function (PaymentStatuses) {
    PaymentStatuses["Pending"] = "Pending";
    PaymentStatuses["Paidout"] = "Paidout";
    PaymentStatuses["InReview"] = "InReview";
    PaymentStatuses["Cancelled"] = "Canceled";
})(PaymentStatuses = exports.PaymentStatuses || (exports.PaymentStatuses = {}));
let Payment = class Payment extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true }),
    __metadata("design:type", String)
], Payment.prototype, "appointmentCode", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Payment.prototype, "code", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", String)
], Payment.prototype, "amount", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Payment.prototype, "invoiceRequired", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Payment.prototype, "invoiceDelivered", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Payment.prototype, "type", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => file_model_1.ProofOfPayment, 'appointmentCode'),
    __metadata("design:type", Array)
], Payment.prototype, "proofOfPayments", void 0);
Payment = __decorate([
    sequelize_typescript_1.Table({
        modelName: 'payment',
    })
], Payment);
exports.Payment = Payment;
//# sourceMappingURL=payment.model.js.map