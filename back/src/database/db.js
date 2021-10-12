import { Sequelize } from 'sequelize';
import { Product } from '../models/Product.js';
//import {Client} from '../models/Client.js';
//import {Admin} from '../models/Admin.js';
require ('dotenv').config;
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

// import { dlopen } from 'process';
// import { constants } from 'os';
// import { fileURLToPath } from 'url';

export const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 6013,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`,
        { logging: false, native: false }
      );

export const sequelize = new Sequelize(
    // 'brxklsvjharos0qnyuiz',    // DBname
    // 'ulvkmebtpkm3rfqx1uak',    // User
    // 'CTzddK5lec538YZL0MUq',    // Password
    // {
    //   host:'brxklsvjharos0qnyuiz-postgresql.services.clever-cloud.com',
    //   dialect:'postgres',
    //   pool:{
    //     max:5,
    //     min:0,
    //     require:30000,
    //     idle:10000
    //   },
    //   logging:false,
    // }
    'postgresql://ulvkmebtpkm3rfqx1uak:CTzddK5lec538YZL0MUq@bndlhxxrg7jx3ufyrw45-postgresql.services.clever-cloud.com:6013/bndlhxxrg7jx3ufyrw45', {
    logging: false, // set to console.log to see the raw SQL queries

   
    
// export const sequelize = new Sequelize(
//     // 'brxklsvjharos0qnyuiz',    // DBname
//     // 'ulvkmebtpkm3rfqx1uak',    // User
//     // 'CTzddK5lec538YZL0MUq',    // Password
//     // {
//     //   host:'brxklsvjharos0qnyuiz-postgresql.services.clever-cloud.com',
//     //   dialect:'postgres',
//     //   pool:{
//     //     max:5,
//     //     min:0,
//     //     require:30000,
//     //     idle:10000
//     //   },
//     //   logging:false,
//     // }
//     'postgresql://ulvkmebtpkm3rfqx1uak:CTzddK5lec538YZL0MUq@bndlhxxrg7jx3ufyrw45-postgresql.services.clever-cloud.com:6013/bndlhxxrg7jx3ufyrw45', {
//     logging: false, // set to console.log to see the raw SQL queries

// }
// )
