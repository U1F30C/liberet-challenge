"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsServiceService = void 0;
const common_1 = require("@nestjs/common");
const image_to_base64_1 = __importDefault(require("image-to-base64"));
let AssetsServiceService = class AssetsServiceService {
    async readImageGetBase64ForHtml(path, type) {
        let prefix;
        if (type == 'jpg')
            prefix = 'data:image/jpeg;base64,';
        else if (type == 'png')
            prefix = 'data:image/png;base64,';
        const codedImage = await image_to_base64_1.default(path);
        return prefix + codedImage;
    }
};
AssetsServiceService = __decorate([
    common_1.Injectable()
], AssetsServiceService);
exports.AssetsServiceService = AssetsServiceService;
//# sourceMappingURL=assets-service.service.js.map