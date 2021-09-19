import * as dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize-typescript';
import { Dialect, Options } from 'sequelize/types';
import { appConfig } from '../src/utils/bootstrap-config-service';

const DB_SSL = appConfig.get('DB_SSL') == 'true';
export const dbConfig: Options = {
  dialect: <Dialect>appConfig.get('DB_CONNECTION', 'postgres'),
  port: +appConfig.get('DB_PORT', '5432'),
  username: appConfig.get('DB_USER'),
  password: appConfig.get('DB_PASSWORD'),
  database: appConfig.get('DB_DATABASE'),
  host: appConfig.get('DB_HOST'),
  logging: appConfig.get('NODE_ENV') === 'development' ? console.log : false,

  ssl: DB_SSL,
  dialectOptions: {},
};
if (DB_SSL) {
  dbConfig.dialectOptions['ssl'] = {
    require: appConfig.get('DB_SSL') == 'true',
    rejectUnauthorized: false,
  };
} else {
  dbConfig.dialectOptions['ssl'] = false;
}

export const sequelizeInstance = new Sequelize(dbConfig);
