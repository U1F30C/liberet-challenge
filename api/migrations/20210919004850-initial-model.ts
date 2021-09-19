import { query } from "express";
import { DataTypes, QueryInterface } from "sequelize";

function timestamps(Types: typeof DataTypes) {
  return {
    createdAt: { type: Types.DATE, allowNull: false },
    updatedAt: { type: Types.DATE, allowNull: false },
  };
}
module.exports = {
  up: async (queryInterface: QueryInterface, Types: typeof DataTypes) => {
    await queryInterface.createTable("users", {
      id: {
        primaryKey: true,
        type: Types.BIGINT,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Types.STRING,
        allowNull: false,
      },
      lastName: {
        type: Types.STRING,
        allowNull: false,
      },
      email: {
        type: Types.STRING,
        allowNull: false,
      },
      ...timestamps(Types),
    });
    await queryInterface.createTable("wallets", {
      userId: {
        primaryKey: true,
        type: Types.BIGINT,
        allowNull: false,
        references: { model: "users" },
      },
      credits: {
        type: Types.DECIMAL,
        allowNull: false,
      },
      ...timestamps(Types),
    });
    await queryInterface.createTable("services", {
      id: {
        primaryKey: true,
        type: Types.BIGINT,
        autoIncrement: true,
        allowNull: false,
      },
      name: { type: Types.STRING, allowNull: false },
      cost: { type: Types.DECIMAL, allowNull: false },
      serviceType: { type: Types.STRING, allowNull: false },
      ...timestamps(Types),
    });
    await queryInterface.createTable("activeServices", {
      userId: {
        type: Types.BIGINT,
        allowNull: false,
        references: { model: "users" },
      },
      serviceId: {
        type: Types.BIGINT,
        allowNull: false,
        references: { model: "services" },
      },
      accumulatedCost: {
        type: Types.DECIMAL,
        allowNull: false,
      },
      ...timestamps(Types),
    });
    await queryInterface.createTable("logs", {
      userId: {
        type: Types.BIGINT,
        allowNull: false,
        references: { model: "users" },
      },
      serviceId: {
        type: Types.BIGINT,
        allowNull: false,
        references: { model: "services" },
      },
      operation: {
        type: Types.STRING,
        allowNull: false,
      },
      cost: {
        type: Types.DECIMAL,
        allowNull: false,
      },
      ...timestamps(Types),
    });
  },
  down: async (queryInterface: QueryInterface, Types: typeof DataTypes) => {
    await queryInterface.dropTable("logs");
    await queryInterface.dropTable("activeServices");
    await queryInterface.dropTable("wallets");
    await queryInterface.dropTable("services");
    await queryInterface.dropTable("users");
  },
};
