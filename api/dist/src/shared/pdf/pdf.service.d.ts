import { Readable } from 'stream';
export declare class PdfService {
    private compiledTemplates;
    private pdfOptions;
    private pdfOptionsWithoutMargin;
    constructor();
    private getHtmlRenderer;
    renderPdf(template: string, locals: any, margins?: boolean): Promise<Readable>;
}
