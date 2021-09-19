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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationService = void 0;
const common_1 = require("@nestjs/common");
const jwt = __importStar(require("jsonwebtoken"));
const users_service_1 = require("../users/users.service");
const bootstrap_config_service_1 = require("../utils/bootstrap-config-service");
const bcrypt_1 = require("bcrypt");
const user_model_1 = require("../users/models/user.model");
const error_codes_1 = require("../users/constants/error-codes");
const error_responses_1 = require("../utils/error-responses");
let AuthorizationService = class AuthorizationService {
    constructor(userService) {
        this.userService = userService;
    }
    async authorizeViaBasic(email, password) {
        try {
            const user = await this.userService.findOneByEmail(email);
            this.checkUserValidity(user);
            if (await bcrypt_1.compare(password, user.password)) {
                return user;
            }
            else {
                throw new common_1.UnauthorizedException(error_responses_1.createErrorResponse(error_codes_1.WrongCredentials));
            }
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                throw new common_1.UnauthorizedException(error_responses_1.createErrorResponse(error_codes_1.WrongCredentials));
            }
            else if (err instanceof common_1.UnauthorizedException ||
                err instanceof common_1.BadRequestException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException(error_responses_1.createErrorResponse(error_codes_1.Unknown));
        }
    }
    checkUserValidity(user) {
        if (!user.isEmailValidated) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(error_codes_1.UserHasNotValidatedEmail));
        }
        if (!user.active) {
            throw new common_1.BadRequestException(error_responses_1.createErrorResponse(error_codes_1.UserIsNotActive));
        }
    }
    authorizeViaJWT(payload) {
        if ('id' in payload && !isNaN(parseInt(payload.id, 10))) {
            return { id: payload.id };
        }
        throw new common_1.UnauthorizedException();
    }
    login(user) {
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            role: user.role,
            email: user.email,
        }, bootstrap_config_service_1.appConfig.get('JWT_KEY'), {
            expiresIn: +bootstrap_config_service_1.appConfig.get('JWT_EXPIRATION_TIME', '3600'),
        });
        return token;
    }
};
AuthorizationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthorizationService);
exports.AuthorizationService = AuthorizationService;
//# sourceMappingURL=authorization.service.js.map