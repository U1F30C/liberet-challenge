import { isNil } from 'lodash';

class AppConfigurationService {
  get(configKey: string, defaultValue?: string): string {
    return process.env[configKey] || defaultValue;
  }

  getNumber(configKey: string, defaultValue?: number): number {
    const value = process.env[configKey];
    if (isNil(value)) return defaultValue;
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue))
      throw new Error(`Expected a number for env variable ${configKey}`);
    return parsedValue;
  }
}
const appConfig = new AppConfigurationService();

export { AppConfigurationService, appConfig };
