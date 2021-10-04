"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/cart'),
    createCart = _require2.createCart,
    getCarts = _require2.getCarts;

var router = Router();
router.post('/:id_client', createCart);
router.get('/', getCarts);
var _default = router;
exports["default"] = _default;