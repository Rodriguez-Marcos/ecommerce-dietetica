"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = require("../database/db.js");

var _Order = _interopRequireDefault(require("./Order.js"));

var _Diet = _interopRequireDefault(require("./Diet.js"));

var _Category = _interopRequireDefault(require("./Category.js"));

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
  through: 'product_order',
  foreignKey: {
    name: 'id_product'
  }
});

_Order["default"].belongsToMany(Product, {
  through: 'product_order',
  foreignKey: {
    name: 'id_order'
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

var _default = Product;
exports["default"] = _default;