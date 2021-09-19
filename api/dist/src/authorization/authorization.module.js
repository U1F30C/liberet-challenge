"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const users_module_1 = require("../users/users.module");
const bootstrap_config_service_1 = require("../utils/bootstrap-config-service");
const authorization_service_1 = require("./authorization.service");
const login_controller_1 = require("./login/login.controller");
const security_controller_1 = require("./login/security.controller");
const verification_controller_1 = require("./login/verification.controller");
const basic_strategy_1 = require("./strategies.ts/basic.strategy");
const jwt_strategy_1 = require("./strategies.ts/jwt.strategy");
let AuthorizationModule = class AuthorizationModule {
};
AuthorizationModule = __decorate([
    common_1.Module({
        controllers: [login_controller_1.LoginController, verification_controller_1.VerificationController, security_controller_1.SecurityController],
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: bootstrap_config_service_1.appConfig.get('JWT_KEY'),
            }),
            users_module_1.UsersModule,
        ],
        providers: [authorization_service_1.AuthorizationService, basic_strategy_1.BasicAuthStrategy, jwt_strategy_1.JwtStrategy],
        exports: [jwt_1.JwtModule],
    })
], AuthorizationModule);
exports.AuthorizationModule = AuthorizationModule;
//# sourceMappingURL=authorization.module.js.map