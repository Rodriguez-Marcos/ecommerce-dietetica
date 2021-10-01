"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = require("../database/db.js");

var _Order = _interopRequireDefault(require("./Order.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Clientbygoogle = _db.sequelize.define('clientbygoogle', {
  googleId: {
    type: _sequelize["default"].TEXT,
    primaryKey: true
  },
  givenName: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  },
  familyName: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  },
  email: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  },
  address: {
    type: _sequelize["default"].TEXT,
    allowNull: true,
    defaultValue: null
  },
  phone: {
    type: _sequelize["default"].TEXT,
    allowNull: true,
    defaultValue: null
  }
}, {
  timestamps: false
});

Clientbygoogle.hasMany(_Order["default"], {
  foreignKey: 'googleId_client',
  sourceKey: 'googleId'
});

_Order["default"].belongsTo(Clientbygoogle, {
  foreignKey: 'googleId_client',
  sourceKey: 'googleId'
});

var _default = Clientbygoogle;
exports["default"] = _default;