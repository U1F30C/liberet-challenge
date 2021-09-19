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
exports.ProofOfPayment = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const proof_of_payment_statuses_1 = require("../constants/proof-of-payment-statuses");
const payment_model_1 = require("./payment.model");
let ProofOfPayment = class ProofOfPayment extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], ProofOfPayment.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProofOfPayment.prototype, "originalName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProofOfPayment.prototype, "mimeType", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProofOfPayment.prototype, "fileName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProofOfPayment.prototype, "path", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ProofOfPayment.prototype, "size", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.ENUM(proof_of_payment_statuses_1.ProofOfPaymentStatuses.InReview, proof_of_payment_statuses_1.ProofOfPaymentStatuses.Invalid, proof_of_payment_statuses_1.ProofOfPaymentStatuses.Valid),
    }),
    __metadata("design:type", String)
], ProofOfPayment.prototype, "proofOfPaymentStatus", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ProofOfPayment.prototype, "appointmentCode", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => payment_model_1.Payment, 'appointmentCode'),
    __metadata("design:type", payment_model_1.Payment)
], ProofOfPayment.prototype, "payment", void 0);
ProofOfPayment = __decorate([
    sequelize_typescript_1.Table({
        modelName: 'proofOfPayment',
    })
], ProofOfPayment);
exports.ProofOfPayment = ProofOfPayment;
//# sourceMappingURL=file.model.js.map