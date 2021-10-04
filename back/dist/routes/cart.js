"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/cart'),
    addToCart = _require2.addToCart,
    getCarts = _require2.getCarts;

var router = Router();
router.post('/:id_client/products/:id_product', addToCart);
router.get('/', getCarts);
var _default = router;
exports["default"] = _default;