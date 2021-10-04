"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _db = require("../database/db.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Review = _db.sequelize.define('review', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  },
  calification: {
    type: _sequelize["default"].FLOAT,
    allowNull: false
  },
  description: {
    type: _sequelize["default"].TEXT,
    allowNull: false
  }
}, {
  timestamps: false
});

var _default = Review;
exports["default"] = _default;