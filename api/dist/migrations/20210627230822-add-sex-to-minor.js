"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sexes_1 = require("../src/constants/sexes");
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.addColumn('minors', 'sex', {
                type: Types.ENUM(sexes_1.Sexes.Female, sexes_1.Sexes.Male),
                allowNull: true,
            });
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.removeColumn('minors', 'sex', {
                transaction: transaction,
            });
            await queryInterface.sequelize.query('DROP TYPE enum_minors_sex', {
                transaction: transaction,
            });
        });
    },
};
//# sourceMappingURL=20210627230822-add-sex-to-minor.js.map