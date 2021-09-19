"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.createTable('setPasswordTokens', {
                id: {
                    type: Types.BIGINT,
                    primaryKey: true,
                    autoIncrement: true,
                },
                token: {
                    type: Types.STRING,
                    allowNull: false,
                },
                validUntil: {
                    type: Types.DATE,
                    allowNull: false,
                },
                createdAt: {
                    type: Types.DATE,
                    allowNull: false,
                },
                updatedAt: {
                    type: Types.DATE,
                    allowNull: false,
                },
                isValid: {
                    type: Types.BOOLEAN,
                    allowNull: false,
                },
                userId: {
                    type: Types.BIGINT,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                },
            }, {
                transaction: transaction,
            });
        });
    },
    down: async (queryInterface, Types) => {
        await queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.dropTable('setPasswordTokens', {
                transaction: transaction,
            });
        });
    },
};
//# sourceMappingURL=20210531203539-set-password-tokens.js.map