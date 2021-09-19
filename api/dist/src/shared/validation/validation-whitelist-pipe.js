"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationWhitelistPipe = void 0;
const common_1 = require("@nestjs/common");
exports.ValidationWhitelistPipe = (groups = undefined) => new common_1.ValidationPipe({
    whitelist: true,
    groups: groups,
});
//# sourceMappingURL=validation-whitelist-pipe.js.map