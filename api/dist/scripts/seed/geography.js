"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = require("../db-connection");
const state_model_1 = require("../../src/geography/models/state.model");
const country_model_1 = require("../../src/geography/models/country.model");
const nationality_model_1 = require("../../src/geography/models/nationality.model");
const municipality_model_1 = require("../../src/geography/models/municipality.model");
const countries_1 = require("../data/countries");
const states_1 = require("../data/states");
const municipalities_1 = require("../data/municipalities");
db_connection_1.sequelizeInstance.addModels([nationality_model_1.Nationality, country_model_1.Country, state_model_1.State, municipality_model_1.Municipality]);
const countries = countries_1.countriesData;
const nationalities = countries.map((country) => ({
    id: country.id,
    name: country.name,
    countryId: country.id,
}));
const states = states_1.statesData.map(({ key, name }) => ({
    id: parseInt(key, 10),
    key: key,
    name,
}));
const municipalities = municipalities_1.municipalitiesData.map(({ key, name, stateKey }, index) => ({
    id: index,
    key: key,
    stateId: parseInt(stateKey),
    name,
}));
async function fillGeographicData() {
    await db_connection_1.sequelizeInstance.transaction(async (transaction) => {
        await country_model_1.Country.bulkCreate(countries, {
            transaction,
            updateOnDuplicate: ['name'],
        });
        await nationality_model_1.Nationality.bulkCreate(nationalities, {
            transaction,
            updateOnDuplicate: ['name'],
        });
        await state_model_1.State.bulkCreate(states, {
            transaction,
            updateOnDuplicate: ['name'],
        });
        await municipality_model_1.Municipality.bulkCreate(municipalities, {
            transaction,
            updateOnDuplicate: ['name'],
        });
    });
}
fillGeographicData();
//# sourceMappingURL=geography.js.map