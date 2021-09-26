"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = require("../database/db.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Product = _db.sequelize.define('product', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  },
  price: {
    type: _sequelize["default"].INTEGER,
    allowNull: false
  },
  description: {
    type: _sequelize["default"].TEXT,
    allowNull: true
  }
}, {
  timestamps: false
});

var _default = Product;
exports["default"] = _default;