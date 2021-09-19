"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = require("../db-connection");
const test_type_codes_1 = require("../../src/appointments/constants/test-type-codes");
const test_type_model_1 = require("../../src/appointments/entities/test-type.model");
db_connection_1.sequelizeInstance.addModels([test_type_model_1.TestType]);
function getOffsetDateFromTime(time) {
    return `1970-01-01T${time}.000Z`;
}
const testTypes = [
    {
        name: 'SARS-CoV-2 RT-PCR',
        price: '2320',
        codePrefix: 'P',
        testTypeCode: test_type_codes_1.TestTypeCodes.PCR,
        releaseTimeOffset: getOffsetDateFromTime('23:59:00'),
    },
    {
        name: 'SARS-CoV-2 RT-PCR EXPRESS (entrega mismo día)',
        price: '2668',
        codePrefix: 'P',
        testTypeCode: test_type_codes_1.TestTypeCodes.PCR,
        releaseTimeOffset: getOffsetDateFromTime('00:00:00'),
    },
    {
        name: 'Anticuerpos (Serológica) IgM e IgG para SARS-CoV-2',
        price: '450',
        codePrefix: 'Y',
        testTypeCode: test_type_codes_1.TestTypeCodes.Antibodies,
        releaseTimeOffset: getOffsetDateFromTime('00:30:00'),
    },
    {
        name: 'Antígenos para SARS-CoV-2',
        price: '680',
        codePrefix: 'X',
        testTypeCode: test_type_codes_1.TestTypeCodes.Antigen,
        releaseTimeOffset: getOffsetDateFromTime('00:30:00'),
    },
];
async function createVariables() {
    await test_type_model_1.TestType.bulkCreate(testTypes.map((testType, i) => ({
        id: i + 1,
        name: testType.name,
        price: testType.price,
        active: true,
        codePrefix: testType.codePrefix,
        testTypeCode: testType.testTypeCode,
        releaseTimeOffset: new Date(testType.releaseTimeOffset),
    })), {
        updateOnDuplicate: [
            'name',
            'price',
            'active',
            'codePrefix',
            'testTypeCode',
            'releaseTimeOffset',
        ],
    });
}
createVariables();
//# sourceMappingURL=create-test-types.js.map