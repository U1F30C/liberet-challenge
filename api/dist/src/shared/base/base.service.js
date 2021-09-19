"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
class BaseService {
    constructor(set, querist) {
        this.querist = querist;
        this.set = set;
    }
    async findById(id) {
        const entity = await this.set.findByPk(id);
        if (!entity) {
            throw new common_1.NotFoundException();
        }
        return entity;
    }
    async findAll(query, customize) {
        return this.querist.query(query, this.set, customize);
    }
    insert(toInsert, options) {
        return this.set.create(toInsert, options);
    }
    update(id, newData) {
        return this.set.update(newData, {
            where: {
                id: id,
            },
        });
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map