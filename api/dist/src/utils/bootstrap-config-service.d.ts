declare class AppConfigurationService {
    get(configKey: string, defaultValue?: string): string;
    getNumber(configKey: string, defaultValue?: number): number;
}
declare const appConfig: AppConfigurationService;
export { AppConfigurationService, appConfig };
