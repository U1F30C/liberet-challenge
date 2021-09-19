"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_connection_1 = require("./db-connection");
const commander_1 = require("commander");
const fs_1 = require("fs");
const lodash_1 = require("lodash");
const path_1 = require("path");
const sequelize_1 = require("sequelize");
const umzug_1 = __importDefault(require("umzug"));
function getMigrationTimestamp() {
    const a = new Date();
    function format(value) {
        return value.toString().padStart(2, '0');
    }
    const year = a.getFullYear();
    const month = format(a.getMonth() + 1);
    const day = format(a.getDate());
    const hour = format(a.getHours());
    const minute = format(a.getMinutes());
    const second = format(a.getSeconds());
    return `${year}${month}${day}${hour}${minute}${second}`;
}
function fileName(name) {
    const timestamp = getMigrationTimestamp();
    const formatedName = lodash_1.kebabCase(name);
    return `${timestamp}-${formatedName}.ts`;
}
function migrationBody() {
    return `import { DataTypes, QueryInterface } from "sequelize";

  module.exports = {
    up: async (queryInterface: QueryInterface, Types: typeof DataTypes) => {},
    down: async (queryInterface: QueryInterface, Types: typeof DataTypes) => {},
  };
  `;
}
class Migrator {
    constructor() {
        const sequelize = new sequelize_1.Sequelize(db_connection_1.dbConfig.database, db_connection_1.dbConfig.username, db_connection_1.dbConfig.password, Object.assign({}, db_connection_1.dbConfig));
        this.umzug = new umzug_1.default({
            migrations: {
                params: [sequelize.getQueryInterface(), sequelize_1.DataTypes],
                path: 'migrations',
                pattern: /.*\.ts$/,
            },
            storageOptions: {
                sequelize: sequelize,
            },
            storage: 'sequelize',
        });
    }
    up() {
        return this.umzug.up();
    }
    down() {
        return this.umzug.down();
    }
    new(migration) {
        return new Promise((resolve, reject) => {
            const path = path_1.join('migrations', fileName(migration));
            fs_1.writeFile(path, migrationBody(), function (error) {
                if (error)
                    reject(error);
                else
                    resolve(fileName(migration));
            });
        });
    }
}
const migrator = new Migrator();
const program = new commander_1.Command();
program.version('0.0.1');
program
    .command('[migration]', { isDefault: true })
    .action(async (migration) => {
    await migrator.up().then(console.log).catch(console.error);
});
program.command('undo [migration]').action(async (migration) => {
    await migrator.down().then(console.log).catch(console.error);
});
program.command('new [migration]').action(async (migration) => {
    await migrator.new(migration).then(console.log).catch(console.error);
});
program.parse();
//# sourceMappingURL=migrate.js.map