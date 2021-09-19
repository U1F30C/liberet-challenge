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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeographyService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const base_service_1 = require("../../shared/base/base.service");
const querist_1 = require("../../shared/querying/querist");
const municipality_model_1 = require("../models/municipality.model");
const state_model_1 = require("../models/state.model");
const locality_model_1 = require("../models/locality.model");
const country_model_1 = require("../models/country.model");
const nationality_model_1 = require("../models/nationality.model");
let GeographyService = class GeographyService extends base_service_1.BaseService {
    constructor(stateDataModel, querist, municipalityDataModel, localityDataModel, countryDataModel, nationalityDataModel) {
        super(stateDataModel, querist);
        this.municipalityDataModel = municipalityDataModel;
        this.localityDataModel = localityDataModel;
        this.countryDataModel = countryDataModel;
        this.nationalityDataModel = nationalityDataModel;
    }
    async findCountry() {
        return await this.countryDataModel.findAll();
    }
    async findOneCountry(id) {
        return await this.countryDataModel.findByPk(id);
    }
    async findNationalities() {
        try {
            let result = await this.nationalityDataModel.findAll();
            return result;
        }
        catch (ex) {
            console.log(ex);
        }
    }
    async findNationalityByCountry(id) {
        const nationalities = await this.nationalityDataModel.findAll({
            where: {
                countryId: id
            }
        });
        return nationalities;
    }
    async findStates() {
        return await this.set.findAll();
    }
    async findOneState(id) {
        const states = await this.set.findByPk(id);
        return states;
    }
    async findMunicipalitiesByState(stateId) {
        const municipalities = await this.municipalityDataModel.findAll({
            where: {
                stateId: stateId
            }
        });
        return municipalities;
    }
    async findMunicipality(id) {
        return await this.municipalityDataModel.findByPk(id);
    }
    async findLocalitiesByMunicipality(municipalityId) {
        const localities = await this.localityDataModel.findAll({
            where: {
                municipalityId: municipalityId
            }
        });
        return localities;
    }
    async findLocality(id) {
        return await this.localityDataModel.findByPk(id);
    }
};
GeographyService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(state_model_1.State)),
    __param(2, sequelize_1.InjectModel(municipality_model_1.Municipality)),
    __param(3, sequelize_1.InjectModel(locality_model_1.Locality)),
    __param(4, sequelize_1.InjectModel(country_model_1.Country)),
    __param(5, sequelize_1.InjectModel(nationality_model_1.Nationality)),
    __metadata("design:paramtypes", [typeof (_a = typeof sequelize_typescript_1.ModelCtor !== "undefined" && sequelize_typescript_1.ModelCtor) === "function" ? _a : Object, querist_1.Querist, typeof (_b = typeof sequelize_typescript_1.ModelCtor !== "undefined" && sequelize_typescript_1.ModelCtor) === "function" ? _b : Object, typeof (_c = typeof sequelize_typescript_1.ModelCtor !== "undefined" && sequelize_typescript_1.ModelCtor) === "function" ? _c : Object, typeof (_d = typeof sequelize_typescript_1.ModelCtor !== "undefined" && sequelize_typescript_1.ModelCtor) === "function" ? _d : Object, typeof (_e = typeof sequelize_typescript_1.ModelCtor !== "undefined" && sequelize_typescript_1.ModelCtor) === "function" ? _e : Object])
], GeographyService);
exports.GeographyService = GeographyService;
//# sourceMappingURL=geography.service.js.map