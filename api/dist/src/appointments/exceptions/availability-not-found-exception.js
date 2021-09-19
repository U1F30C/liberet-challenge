"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityError = void 0;
class AvailabilityError extends Error {
    constructor(code) {
        super(code);
        this.code = code;
    }
}
exports.AvailabilityError = AvailabilityError;
//# sourceMappingURL=availability-not-found-exception.js.map