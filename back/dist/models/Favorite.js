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

var Favorite = _db.sequelize.define('favorite', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  timestamps: false
});

_Product["default"].belongsToMany(Favorite, {
  through: 'product_favorite',
  foreignKey: {
    name: 'id_product'
  }
});

Favorite.belongsToMany(_Product["default"], {
  through: 'product_favorite',
  foreignKey: {
    name: 'id_favorite'
  }
});

_Client["default"].hasOne(Favorite, {
  foreignKey: 'id_client',
  sourceKey: 'id'
});

Favorite.belongsTo(_Client["default"], {
  foreignKey: 'id_client',
  sourceKey: 'id'
});

_Clientbygoogle["default"].hasOne(Favorite, {
  foreignKey: 'id_clientGoogle',
  sourceKey: 'googleId'
});

Favorite.belongsTo(_Clientbygoogle["default"], {
  foreignKey: 'id_clientGoogle',
  sourceKey: 'googleId'
});
var _default = Favorite;
exports["default"] = _default;