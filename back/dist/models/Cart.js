"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = require("../database/db.js");

var _Product = _interopRequireDefault(require("./Product.js"));

var _Client = _interopRequireDefault(require("./Client.js"));

var _Clientbygoogle = _interopRequireDefault(require("./Clientbygoogle.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Cart = _db.sequelize.define('cart', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  timestamps: false
});

_Product["default"].belongsToMany(Cart, {
  through: 'product_cart',
  foreignKey: {
    name: 'id_product'
  }
});

Cart.belongsToMany(_Product["default"], {
  through: 'product_cart',
  foreignKey: {
    name: 'id_cart'
  }
});

_Client["default"].hasOne(Cart, {
  foreignKey: 'id_client',
  sourceKey: 'id'
});

Cart.belongsTo(_Client["default"], {
  foreignKey: 'id_client',
  sourceKey: 'id'
});

_Clientbygoogle["default"].hasOne(Cart, {
  foreignKey: 'id_clientGoogle',
  sourceKey: 'googleId'
});

Cart.belongsTo(_Clientbygoogle["default"], {
  foreignKey: 'id_clientGoogle',
  sourceKey: 'googleId'
});
var _default = Cart;
exports["default"] = _default;

