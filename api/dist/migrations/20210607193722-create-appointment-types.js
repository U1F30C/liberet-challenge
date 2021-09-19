"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_type_codes_1 = require("../src/appointments/constants/test-type-codes");
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.createTable('testTypes', {
            id: {
                type: Types.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Types.STRING,
                allowNull: false,
            },
            price: {
                type: Types.DECIMAL,
                allowNull: false,
            },
            testTypeCode: {
                type: Types.ENUM(test_type_codes_1.TestTypeCodes.PCR, test_type_codes_1.TestTypeCodes.Antibodies, test_type_codes_1.TestTypeCodes.Antigen),
                allowNull: false,
            },
            active: {
                type: Types.BOOLEAN,
                allowNull: false,
            }
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.dropTable('testTypes');
    },
};
//# sourceMappingURL=20210607193722-create-appointment-types.js.map