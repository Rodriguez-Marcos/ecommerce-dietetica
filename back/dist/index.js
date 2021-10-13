"use strict";

var _app = _interopRequireDefault(require("./app.js"));

var _db = require("./database/db.js");

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const { DB_PORT } = process.env;
require('dotenv').config();

var PORT = process.env.PORT;

function main() {
  _db.sequelize.sync({
    force: false
  }).then(function () {
    _app["default"].listen(PORT, function () {
      console.log(PORT); // eslint-disable-line no-console
    });
  });
}

main();