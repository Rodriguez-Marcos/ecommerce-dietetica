"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = void 0;

var _sequelize = require("sequelize");

require('dotenv').config();

var _process$env = process.env,
    DB_USER = _process$env.DB_USER,
    DB_PASSWORD = _process$env.DB_PASSWORD,
    DB_HOST = _process$env.DB_HOST;
var sequelize = process.env.NODE_ENV === "production" ? new _sequelize.Sequelize({
  database: DB_NAME,
  dialect: "postgresql",
  host: DB_HOST,
  port: 6013,
  username: DB_USER,
  password: DB_PASSWORD,
  pool: {
    max: 3,
    min: 1,
    idle: 10000
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    keepAlive: true
  },
  ssl: true
}) : new _sequelize.Sequelize("postgresql://".concat(DB_USER, ":").concat(DB_PASSWORD, "@").concat(DB_HOST, ":6013/bndlhxxrg7jx3ufyrw45"), {
  logging: false // set to console.log to see the raw SQL queries

}); // export const sequelize = new Sequelize(
//     {DB_NAME},    // DBname
//     {DB_USER},    // User
//     {DB_PASSWORD}, 
//        // Password
//     {
//       host:{DB_HOST},
//       dialect:'postgres',
//       pool:{
//         max:5,
//         min:0,
//         require:30000,
//         idle:10000
//       },
//       logging:false,
//     }
//     , {
//     logging: false, // set to console.log to see the raw SQL queries
// }
// )

exports.sequelize = sequelize;