"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sexes_1 = require("../src/constants/sexes");
const udg_community_code_types_1 = require("../src/constants/udg-community-code-types");
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.createTable('countries', {
                id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    primaryKey: true,
                },
                name: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
            }, {
                transaction: transaction,
            });
            await queryInterface.createTable('nationalities', {
                id: {
                    type: sequelize_1.DataTypes.BIGINT,
                    primaryKey: true,
                },
                countryId: {
                    type: sequelize_1.DataTypes.INTEGER,
                    references: {
                        model: 'countries',
                        key: 'id',
                    },
                },
                name: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
            }, {
                transaction: transaction,
            });
            await queryInterface.createTable('states', {
                id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    primaryKey: true,
                },
                key: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                name: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
            }, {
                transaction: transaction,
            });
            await queryInterface.createTable('municipalities', {
                id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    primaryKey: true,
                },
                key: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                name: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                stateId: {
                    type: sequelize_1.DataTypes.INTEGER,
                    references: {
                        model: 'states',
                        key: 'id',
                    },
                },
            }, {
                transaction: transaction,
            });
            await queryInterface.createTable('localities', {
                id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    primaryKey: true,
                },
                key: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                name: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                municipalityId: {
                    type: sequelize_1.DataTypes.INTEGER,
                    references: {
                        model: 'municipalities',
                        key: 'id',
                    },
                },
            }, {
                transaction: transaction,
            });
            await queryInterface.createTable('clients', {
                userId: {
                    type: Types.BIGINT,
                    primaryKey: true,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                },
                birthDate: {
                    type: Types.DATEONLY,
                    allowNull: false,
                },
                sex: {
                    type: Types.ENUM(sexes_1.Sexes.Female, sexes_1.Sexes.Male),
                    allowNull: false,
                },
                phone: {
                    type: Types.STRING(10),
                    allowNull: false,
                },
                occupation: {
                    type: Types.STRING,
                    allowNull: false,
                },
                curp: {
                    type: Types.STRING(20),
                    allowNull: false,
                },
                nationalityId: {
                    type: Types.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'nationalities',
                        key: 'id',
                    },
                },
                originCountryId: {
                    type: Types.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'countries',
                        key: 'id',
                    },
                },
                createdAt: {
                    type: Types.DATE,
                    allowNull: false,
                },
                updatedAt: {
                    type: Types.DATE,
                    allowNull: false,
                },
            }, {
                transaction: transaction,
            });
            await queryInterface.createTable('addresses', {
                clientId: {
                    type: sequelize_1.DataTypes.BIGINT,
                    primaryKey: true,
                    references: {
                        model: 'clients',
                        key: 'userId',
                    },
                },
                municipalityId: {
                    type: sequelize_1.DataTypes.INTEGER,
                    references: {
                        model: 'municipalities',
                        key: 'id',
                    },
                },
                zipCode: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                },
                neighborhood: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true,
                },
                street: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true,
                },
                number: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true,
                },
                internalNumber: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: true,
                },
                stateId: {
                    type: sequelize_1.DataTypes.INTEGER,
                    references: {
                        model: 'states',
                        key: 'id',
                    },
                    allowNull: false,
                },
            }, {
                transaction: transaction,
            });
            await queryInterface.createTable('udgCodes', {
                userId: {
                    type: sequelize_1.DataTypes.BIGINT,
                    primaryKey: true,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                },
                code: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                type: {
                    type: sequelize_1.DataTypes.ENUM(udg_community_code_types_1.UdgCommunityCodeTypes.Employee, udg_community_code_types_1.UdgCommunityCodeTypes.Student),
                    allowNull: false,
                },
            }, {
                transaction: transaction,
            });
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.dropTable('udgCodes', {
                transaction: transaction,
            });
            await queryInterface.dropTable('addresses', {
                transaction: transaction,
            });
            await queryInterface.dropTable('clients', { transaction: transaction });
            await queryInterface.dropTable('localities', {
                transaction: transaction,
            });
            await queryInterface.dropTable('municipalities', {
                transaction: transaction,
            });
            await queryInterface.dropTable('states', { transaction: transaction });
            await queryInterface.dropTable('nationalities', {
                transaction: transaction,
            });
            await queryInterface.dropTable('countries', {
                transaction: transaction,
            });
        });
    },
};
//# sourceMappingURL=20210526215524-client.js.map