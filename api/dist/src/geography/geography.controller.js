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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeographyController = void 0;
const common_1 = require("@nestjs/common");
const geography_service_1 = require("./Services/geography.service");
let GeographyController = class GeographyController {
    constructor(geographyDataService) {
        this.geographyDataService = geographyDataService;
    }
    async findCountry() {
        return this.geographyDataService.findCountry();
    }
    async findOneCountry(id) {
        return this.geographyDataService.findOneCountry(+id);
    }
    async findNationalities() {
        let result = await this.geographyDataService.findNationalities();
        return result;
    }
    async findNationalityByCountry(id) {
        return this.geographyDataService.findNationalityByCountry(+id);
    }
    async findState() {
        return this.geographyDataService.findStates();
    }
    async findOneState(id) {
        return this.geographyDataService.findOneState(+id);
    }
    async findMunicipality(id) {
        return this.geographyDataService.findMunicipality(+id);
    }
    async findMunicipalityByMunicipality(stateId) {
        return this.geographyDataService.findMunicipalitiesByState(+stateId);
    }
    async findLocalityByState(id) {
        return this.geographyDataService.findLocality(+id);
    }
    async findLocalityByMunicipality(municipalityId) {
        return this.geographyDataService.findLocalitiesByMunicipality(+municipalityId);
    }
};
__decorate([
    common_1.Get('/country'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GeographyController.prototype, "findCountry", null);
__decorate([
    common_1.Get('/country/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeographyController.prototype, "findOneCountry", null);
__decorate([
    common_1.Get('/nationality'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GeographyController.prototype, "findNationalities", null);
__decorate([
    common_1.Get('/nationality/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeographyController.prototype, "findNationalityByCountry", null);
__decorate([
    common_1.Get('/state'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GeographyController.prototype, "findState", null);
__decorate([
    common_1.Get('/state/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeographyController.prototype, "findOneState", null);
__decorate([
    common_1.Get('/municipality/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeographyController.prototype, "findMunicipality", null);
__decorate([
    common_1.Get('/municipalities/:stateId'),
    __param(0, common_1.Param('stateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeographyController.prototype, "findMunicipalityByMunicipality", null);
__decorate([
    common_1.Get('/locality/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeographyController.prototype, "findLocalityByState", null);
__decorate([
    common_1.Get('/localities/:municipalityId'),
    __param(0, common_1.Param('municipalityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeographyController.prototype, "findLocalityByMunicipality", null);
GeographyController = __decorate([
    common_1.Controller('geography'),
    __metadata("design:paramtypes", [geography_service_1.GeographyService])
], GeographyController);
exports.GeographyController = GeographyController;
//# sourceMappingURL=geography.controller.js.map