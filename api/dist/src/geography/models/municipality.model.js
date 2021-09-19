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
exports.Municipality = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const state_model_1 = require("./state.model");
let Municipality = class Municipality extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true }),
    __metadata("design:type", Number)
], Municipality.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Municipality.prototype, "key", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Municipality.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Municipality.prototype, "stateId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => state_model_1.State, 'stateId'),
    __metadata("design:type", state_model_1.State)
], Municipality.prototype, "state", void 0);
Municipality = __decorate([
    sequelize_typescript_1.Table({
        modelName: 'municipality',
        timestamps: false,
    })
], Municipality);
exports.Municipality = Municipality;
//# sourceMappingURL=municipality.model.js.map