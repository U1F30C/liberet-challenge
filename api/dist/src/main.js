"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const bootstrap_config_service_1 = require("./utils/bootstrap-config-service");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors_1.default());
    app.use(cookie_parser_1.default());
    const docsOptions = new swagger_1.DocumentBuilder()
        .setTitle('Ladim')
        .setDescription('The Ladim API description')
        .setVersion('1.0')
        .build();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.enableCors();
    const document = swagger_1.SwaggerModule.createDocument(app, docsOptions);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(bootstrap_config_service_1.appConfig.getNumber('PORT', 3000), '0.0.0.0');
    process.on('SIGTERM', async () => {
        console.info('SIGTERM signal received. Closing app...');
        await app.close();
        process.exit(0);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map