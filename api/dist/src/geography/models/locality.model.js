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
exports.Locality = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const municipality_model_1 = require("./municipality.model");
let Locality = class Locality extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true }),
    __metadata("design:type", Number)
], Locality.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Locality.prototype, "key", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Locality.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Locality.prototype, "municipalityId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => municipality_model_1.Municipality, "municipalityId"),
    __metadata("design:type", municipality_model_1.Municipality)
], Locality.prototype, "municipality", void 0);
Locality = __decorate([
    sequelize_typescript_1.Table({
        modelName: 'locality',
        timestamps: false,
    })
], Locality);
exports.Locality = Locality;
//# sourceMappingURL=locality.model.js.map