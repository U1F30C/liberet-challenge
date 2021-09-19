"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeographyModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const shared_module_1 = require("../shared/shared.module");
const geography_controller_1 = require("./geography.controller");
const country_model_1 = require("./models/country.model");
const locality_model_1 = require("./models/locality.model");
const municipality_model_1 = require("./models/municipality.model");
const nationality_model_1 = require("./models/nationality.model");
const state_model_1 = require("./models/state.model");
const geography_service_1 = require("./Services/geography.service");
let GeographyModule = class GeographyModule {
};
GeographyModule = __decorate([
    common_1.Module({
        imports: [
            sequelize_1.SequelizeModule.forFeature([
                country_model_1.Country,
                locality_model_1.Locality,
                municipality_model_1.Municipality,
                state_model_1.State,
                nationality_model_1.Nationality,
            ]),
            shared_module_1.SharedModule,
        ],
        providers: [geography_service_1.GeographyService],
        controllers: [geography_controller_1.GeographyController],
        exports: [sequelize_1.SequelizeModule],
    })
], GeographyModule);
exports.GeographyModule = GeographyModule;
//# sourceMappingURL=geography.module.js.map