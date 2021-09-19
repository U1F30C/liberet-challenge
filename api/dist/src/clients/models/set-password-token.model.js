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
exports.SetPasswordToken = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
let SetPasswordToken = class SetPasswordToken extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], SetPasswordToken.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], SetPasswordToken.prototype, "token", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SetPasswordToken.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], SetPasswordToken.prototype, "isValid", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_1.DataTypes.DATE }),
    __metadata("design:type", Object)
], SetPasswordToken.prototype, "validUntil", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_1.DataTypes.DATE }),
    __metadata("design:type", Object)
], SetPasswordToken.prototype, "createdAt", void 0);
SetPasswordToken = __decorate([
    sequelize_typescript_1.Table({
        modelName: 'setPasswordToken',
    })
], SetPasswordToken);
exports.SetPasswordToken = SetPasswordToken;
//# sourceMappingURL=set-password-token.model.js.map