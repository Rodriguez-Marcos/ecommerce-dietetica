"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/cart'),
    addToCart = _require2.addToCart,
    getCart = _require2.getCart,
    removeFromCart = _require2.removeFromCart;

var router = Router();
router.post('/', addToCart);
router.get('/', getCart);
router["delete"]('/', removeFromCart);
var _default = router;
exports["default"] = _default;