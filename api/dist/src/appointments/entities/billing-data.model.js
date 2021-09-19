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
exports.BillingData = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const client_model_1 = require("../../clients/models/client.model");
const municipality_model_1 = require("../../geography/models/municipality.model");
const state_model_1 = require("../../geography/models/state.model");
const locality_model_1 = require("../../geography/models/locality.model");
let BillingData = class BillingData extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true }),
    __metadata("design:type", Number)
], BillingData.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], BillingData.prototype, "clientId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], BillingData.prototype, "rfc", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], BillingData.prototype, "corporateName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], BillingData.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], BillingData.prototype, "municipalityId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], BillingData.prototype, "zipCode", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], BillingData.prototype, "street", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], BillingData.prototype, "number", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], BillingData.prototype, "internalNumber", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], BillingData.prototype, "stateId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], BillingData.prototype, "localityId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], BillingData.prototype, "neighborhood", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => municipality_model_1.Municipality, 'municipalityId'),
    __metadata("design:type", municipality_model_1.Municipality)
], BillingData.prototype, "municipality", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => state_model_1.State, 'stateId'),
    __metadata("design:type", state_model_1.State)
], BillingData.prototype, "state", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => client_model_1.Client, 'clientId'),
    __metadata("design:type", client_model_1.Client)
], BillingData.prototype, "client", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => locality_model_1.Locality, 'localityId'),
    __metadata("design:type", locality_model_1.Locality)
], BillingData.prototype, "locality", void 0);
BillingData = __decorate([
    sequelize_typescript_1.Table({
        modelName: 'billingData',
        tableName: 'billingData',
        timestamps: false,
    })
], BillingData);
exports.BillingData = BillingData;
//# sourceMappingURL=billing-data.model.js.map