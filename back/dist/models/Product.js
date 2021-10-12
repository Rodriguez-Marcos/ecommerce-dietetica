"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = require("../database/db.js");

var _Order = _interopRequireDefault(require("./Order.js"));

var _Cart = _interopRequireDefault(require("./Cart.js"));

var _Diet = _interopRequireDefault(require("./Diet.js"));

var _Category = _interopRequireDefault(require("./Category.js"));

var _Review = _interopRequireDefault(require("./Review.js"));

var _Product_Order = _interopRequireDefault(require("./Product_Order.js"));

var _Product_Cart = _interopRequireDefault(require("./Product_Cart.js"));

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
  },
  image: {
    type: _sequelize["default"].TEXT,
    allowNull: true
  },
  stock: {
    type: _sequelize["default"].INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

Product.belongsToMany(_Order["default"], {
  through: _Product_Order["default"],
  foreignKey: {
    name: 'id_product'
  }
});

_Order["default"].belongsToMany(Product, {
  through: _Product_Order["default"],
  foreignKey: {
    name: 'id_order'
  }
});

Product.belongsToMany(_Cart["default"], {
  through: _Product_Cart["default"],
  foreignKey: {
    name: 'id_product'
  }
});

_Cart["default"].belongsToMany(Product, {
  through: _Product_Cart["default"],
  foreignKey: {
    name: 'id_cart'
  }
});

Product.belongsToMany(_Diet["default"], {
  through: 'product_diet',
  foreignKey: {
    name: 'id_product'
  }
});

_Diet["default"].belongsToMany(Product, {
  through: 'product_diet',
  foreignKey: {
    name: 'id_diet'
  }
});

Product.belongsToMany(_Category["default"], {
  through: 'product_category',
  foreignKey: {
    name: 'id_product'
  }
});

_Category["default"].belongsToMany(Product, {
  through: 'product_category',
  foreignKey: {
    name: 'id_category'
  }
});

Product.hasMany(_Review["default"], {
  foreignKey: 'id_product',
  sourceKey: 'id'
});

_Review["default"].belongsTo(Product, {
  foreignKey: 'id_product',
  sourceKey: 'id'
});

var _default = Product;
exports["default"] = _default;