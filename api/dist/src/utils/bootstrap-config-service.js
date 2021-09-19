"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = exports.AppConfigurationService = void 0;
const lodash_1 = require("lodash");
class AppConfigurationService {
    get(configKey, defaultValue) {
        return process.env[configKey] || defaultValue;
    }
    getNumber(configKey, defaultValue) {
        const value = process.env[configKey];
        if (lodash_1.isNil(value))
            return defaultValue;
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue))
            throw new Error(`Expected a number for env variable ${configKey}`);
        return parsedValue;
    }
}
exports.AppConfigurationService = AppConfigurationService;
const appConfig = new AppConfigurationService();
exports.appConfig = appConfig;
//# sourceMappingURL=bootstrap-config-service.js.map