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
exports.UdgCode = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const udg_community_code_types_1 = require("../../constants/udg-community-code-types");
let UdgCode = class UdgCode extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true }),
    __metadata("design:type", Number)
], UdgCode.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], UdgCode.prototype, "code", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.ENUM(udg_community_code_types_1.UdgCommunityCodeTypes.Employee, udg_community_code_types_1.UdgCommunityCodeTypes.Student) }),
    __metadata("design:type", String)
], UdgCode.prototype, "type", void 0);
UdgCode = __decorate([
    sequelize_typescript_1.Table({
        modelName: 'udgCode',
        timestamps: false,
    })
], UdgCode);
exports.UdgCode = UdgCode;
//# sourceMappingURL=udg-codes.model.js.map