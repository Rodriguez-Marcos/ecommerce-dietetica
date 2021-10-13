"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = require("../database/db.js");

var _Product = _interopRequireDefault(require("./Product.js"));

var _Client = _interopRequireDefault(require("./Client.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Cart = _db.sequelize.define('cart', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  totalAmount: {
    type: _sequelize["default"].INTEGER,
    allowNull: true,
    defaultValue: null
  }
}, {
  timestamps: false
});

_Client["default"].hasOne(Cart, {
  foreignKey: 'id_client',
  sourceKey: 'id'
});

Cart.belongsTo(_Client["default"], {
  foreignKey: 'id_client',
  sourceKey: 'id'
});
var _default = Cart;
exports["default"] = _default;