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
exports.Client = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const country_model_1 = require("../../geography/models/country.model");
const nationality_model_1 = require("../../geography/models/nationality.model");
const user_model_1 = require("../../users/models/user.model");
const sexes_1 = require("../../constants/sexes");
const address_model_1 = require("./address.model");
const billing_data_model_1 = require("../../appointments/entities/billing-data.model");
const appointment_model_1 = require("../../appointments/entities/appointment.model");
let Client = class Client extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true }),
    __metadata("design:type", Number)
], Client.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_1.DataTypes.DATEONLY }),
    __metadata("design:type", Object)
], Client.prototype, "birthDate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "sex", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "phone", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "occupation", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "curp", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Client.prototype, "nationalityId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Client.prototype, "originCountryId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "passport", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => appointment_model_1.Appointment, 'clientId'),
    __metadata("design:type", Array)
], Client.prototype, "appointments", void 0);
__decorate([
    sequelize_typescript_1.HasOne(() => address_model_1.Address, 'clientId'),
    __metadata("design:type", address_model_1.Address)
], Client.prototype, "address", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => nationality_model_1.Nationality, 'nationalityId'),
    __metadata("design:type", nationality_model_1.Nationality)
], Client.prototype, "nationality", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => user_model_1.User, 'userId'),
    __metadata("design:type", user_model_1.User)
], Client.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => country_model_1.Country, 'originCountryId'),
    __metadata("design:type", country_model_1.Country)
], Client.prototype, "originCountry", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => billing_data_model_1.BillingData, 'clientId'),
    __metadata("design:type", Array)
], Client.prototype, "billingData", void 0);
Client = __decorate([
    sequelize_typescript_1.Table({
        modelName: 'client',
    })
], Client);
exports.Client = Client;
//# sourceMappingURL=client.model.js.map