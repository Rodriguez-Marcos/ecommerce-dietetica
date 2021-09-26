"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/product'),
    createProduct = _require2.createProduct;

var router = Router();
router.post('/', createProduct);
var _default = router;
exports["default"] = _default;