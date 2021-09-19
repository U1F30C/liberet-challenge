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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Querist_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Querist = exports.isValidOdataQuery = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const odata_parser_1 = require("odata-parser");
const sequelize_1 = require("sequelize");
const odata_sequelize_1 = __importDefault(require("../packages/odata-sequelize"));
function toString(oDataQuery) {
    return (Object.entries(oDataQuery)
        .map(([key, value]) => `${key}=${value}`)
        .join('&') || Querist.DefaultQueryString);
}
function isValidOdataQuery(query) {
    const queryString = toString(query);
    return !('error' in odata_parser_1.parse(queryString));
}
exports.isValidOdataQuery = isValidOdataQuery;
let Querist = Querist_1 = class Querist {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    async query(oDataQuery, set, customize = () => { }) {
        const queryString = toString(oDataQuery);
        const options = odata_sequelize_1.default(queryString, this.sequelize, set.name);
        !options.offset && (options.offset = 0);
        !options.limit && (options.limit = Querist_1.MaxRows);
        options.distinct = true;
        customize(options, this.sequelize);
        return set.findAndCountAll(options).then((data) => ({
            elements: data.rows,
            totalCount: lodash_1.has(data.count, 'length')
                ? data.count.length
                : data.count,
            skip: options.offset,
            top: options.limit,
        }));
    }
};
Querist.MaxRows = 500;
Querist.DefaultQueryString = `$skip=0&$top=${Querist_1.MaxRows}`;
Querist = Querist_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof sequelize_1.Sequelize !== "undefined" && sequelize_1.Sequelize) === "function" ? _a : Object])
], Querist);
exports.Querist = Querist;
//# sourceMappingURL=querist.js.map