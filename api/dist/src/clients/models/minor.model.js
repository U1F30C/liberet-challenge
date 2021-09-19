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
exports.Minor = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sexes_1 = require("../../constants/sexes");
let Minor = class Minor extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], Minor.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Minor.prototype, "clientId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Minor.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Minor.prototype, "lastName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Minor.prototype, "mothersLastName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Minor.prototype, "curp", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Minor.prototype, "birthDate", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.ENUM(sexes_1.Sexes.Female, sexes_1.Sexes.Male),
    }),
    __metadata("design:type", String)
], Minor.prototype, "sex", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Minor.prototype, "passport", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.VIRTUAL,
        get() {
            var _a, _b, _c;
            const name = (_a = this.getDataValue('name')) !== null && _a !== void 0 ? _a : '';
            const lastName = (_b = this.getDataValue('lastName')) !== null && _b !== void 0 ? _b : '';
            const mothersLastName = (_c = this.getDataValue('mothersLastName')) !== null && _c !== void 0 ? _c : '';
            return `${name} ${lastName} ${mothersLastName}`;
        },
    }),
    __metadata("design:type", String)
], Minor.prototype, "fullName", void 0);
Minor = __decorate([
    sequelize_typescript_1.Table({
        modelName: 'minor',
        timestamps: false,
    })
], Minor);
exports.Minor = Minor;
//# sourceMappingURL=minor.model.js.map