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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const base_service_1 = require("../../shared/base/base.service");
const querist_1 = require("../../shared/querying/querist");
const audit_model_1 = require("../models/audit.model");
let AuditsService = class AuditsService extends base_service_1.BaseService {
    constructor(auditModel, querist) {
        super(auditModel, querist);
    }
    async findAllAudits(query) {
        const audits = await this.findAll(query);
        audits.elements = audits.elements.map((audit) => {
            const auditsDto = audit.toJSON();
            return auditsDto;
        });
        return audits;
    }
};
AuditsService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(audit_model_1.Audits)),
    __metadata("design:paramtypes", [typeof (_a = typeof sequelize_typescript_1.ModelCtor !== "undefined" && sequelize_typescript_1.ModelCtor) === "function" ? _a : Object, querist_1.Querist])
], AuditsService);
exports.AuditsService = AuditsService;
//# sourceMappingURL=audits.service.js.map