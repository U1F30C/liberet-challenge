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
exports.Address = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const locality_model_1 = require("../../geography/models/locality.model");
const municipality_model_1 = require("../../geography/models/municipality.model");
const state_model_1 = require("../../geography/models/state.model");
const sexes_1 = require("../../constants/sexes");
const client_model_1 = require("./client.model");
let Address = class Address extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true }),
    __metadata("design:type", Number)
], Address.prototype, "clientId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Address.prototype, "municipalityId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Address.prototype, "zipCode", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Address.prototype, "neighborhood", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Address.prototype, "street", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Address.prototype, "number", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Address.prototype, "internalNumber", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Address.prototype, "stateId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => client_model_1.Client, 'clientId'),
    __metadata("design:type", client_model_1.Client)
], Address.prototype, "client", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => municipality_model_1.Municipality, 'municipalityId'),
    __metadata("design:type", municipality_model_1.Municipality)
], Address.prototype, "municipality", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => state_model_1.State, 'stateId'),
    __metadata("design:type", state_model_1.State)
], Address.prototype, "state", void 0);
Address = __decorate([
    sequelize_typescript_1.Table({
        modelName: 'address',
        timestamps: false,
    })
], Address);
exports.Address = Address;
//# sourceMappingURL=address.model.js.map