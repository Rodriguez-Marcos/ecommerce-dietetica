"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = require("../database/db.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Order = _db.sequelize.define('order', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ammount: {
    type: _sequelize["default"].INTEGER,
    allowNull: true,
    defaultValue: null
  },
  shippingAddress: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  },
  createDate: {
    type: _sequelize["default"].DATE,
    defaultValue: _sequelize["default"].fn('NOW')
  },
  status: {
    type: _sequelize["default"].TEXT,
    values: ["creada", "procesando", "cancelada", "completa"],
    defaultValue: "creada"
  }
}, {
  timestamps: false
});

var _default = Order;
exports["default"] = _default;