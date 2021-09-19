"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorResponse = void 0;
function createErrorResponse(...errors) {
    return errors.map(e => ({
        type: e
    }));
}
exports.createErrorResponse = createErrorResponse;
//# sourceMappingURL=error-responses.js.map