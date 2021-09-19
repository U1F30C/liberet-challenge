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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const pug_1 = require("pug");
const puppeteer_1 = __importDefault(require("puppeteer"));
let PdfService = class PdfService {
    constructor() {
        this.compiledTemplates = {};
        this.pdfOptions = {
            printBackground: true,
            margin: {
                left: '0.5in',
                top: '0.5in',
                right: '0.5in',
                bottom: '0.5in',
            },
        };
        this.pdfOptionsWithoutMargin = {
            printBackground: true,
            margin: {},
        };
    }
    getHtmlRenderer(template) {
        if (true) {
            this.compiledTemplates[template] = pug_1.compileFile(path_1.join(__dirname, '..', '..', '..', '..', 'pdfs', template, 'html.pug'), {
                basedir: path_1.join(__dirname, '..', '..', '..', 'pdfs'),
            });
        }
        return this.compiledTemplates[template];
    }
    async renderPdf(template, locals, margins = true) {
        const htmlRender = this.getHtmlRenderer(template);
        const html = htmlRender(locals);
        const browser = await puppeteer_1.default.launch({ headless: true });
        const page = await browser.newPage();
        await page.setContent(html);
        if (margins)
            return page.createPDFStream(this.pdfOptions);
        else
            return page.createPDFStream(this.pdfOptionsWithoutMargin);
    }
};
PdfService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], PdfService);
exports.PdfService = PdfService;
//# sourceMappingURL=pdf.service.js.map