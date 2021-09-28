"use strict";

var _app = _interopRequireDefault(require("./app.js"));

var _db = require("./database/db.js");

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function main() {
  _db.sequelize.sync({
    force: true
  }).then(function () {
    _app["default"].listen(3001, function () {
      console.log('listening on port 3001'); // eslint-disable-line no-console
    });
  });
}

main();