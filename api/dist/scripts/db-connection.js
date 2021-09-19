"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeInstance = exports.dbConfig = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const sequelize_typescript_1 = require("sequelize-typescript");
const bootstrap_config_service_1 = require("../src/utils/bootstrap-config-service");
const DB_SSL = bootstrap_config_service_1.appConfig.get('DB_SSL') == 'true';
exports.dbConfig = {
    dialect: bootstrap_config_service_1.appConfig.get('DB_CONNECTION', 'postgres'),
    port: +bootstrap_config_service_1.appConfig.get('DB_PORT', '5432'),
    username: bootstrap_config_service_1.appConfig.get('DB_USER'),
    password: bootstrap_config_service_1.appConfig.get('DB_PASSWORD'),
    database: bootstrap_config_service_1.appConfig.get('DB_DATABASE'),
    host: bootstrap_config_service_1.appConfig.get('DB_HOST'),
    logging: bootstrap_config_service_1.appConfig.get('NODE_ENV') === 'development' ? console.log : false,
    ssl: DB_SSL,
    dialectOptions: {},
};
if (DB_SSL) {
    exports.dbConfig.dialectOptions['ssl'] = {
        require: bootstrap_config_service_1.appConfig.get('DB_SSL') == 'true',
        rejectUnauthorized: false,
    };
}
else {
    exports.dbConfig.dialectOptions['ssl'] = false;
}
exports.sequelizeInstance = new sequelize_typescript_1.Sequelize(exports.dbConfig);
//# sourceMappingURL=db-connection.js.map