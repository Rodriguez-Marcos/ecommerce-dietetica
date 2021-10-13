"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = require("../database/db.js");

var _Order = _interopRequireDefault(require("./Order.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Client = _db.sequelize.define('client', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  },
  lastname: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  },
  email: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  },
  password: {
    type: _sequelize["default"].TEXT,
    allowNull: true
  },
  address: {
    type: _sequelize["default"].TEXT,
    allowNull: true
  },
  phone: {
    type: _sequelize["default"].TEXT,
    allowNull: true,
    defaultValue: null
  },
  isAdmin: {
    type: _sequelize["default"].BOOLEAN,
    defaultValue: false
  },
  isGoogleClient: {
    type: _sequelize["default"].BOOLEAN,
    defaultValue: false
  },
  googleId: {
    type: _sequelize["default"].TEXT,
    defaultValue: null
  }
}, {
  timestamps: false
});

Client.hasMany(_Order["default"], {
  foreignKey: 'id_client',
  sourceKey: 'id'
});

_Order["default"].belongsTo(Client, {
  foreignKey: 'id_client',
  sourceKey: 'id'
});

var _default = Client;
exports["default"] = _default;