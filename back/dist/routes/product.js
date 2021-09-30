"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/product'),
    createProduct = _require2.createProduct,
    getProducts = _require2.getProducts,
    getById = _require2.getById,
    deleteProduct = _require2.deleteProduct,
    postOrder = _require2.postOrder;

var router = Router();
router.post('/', createProduct);
router.post('/:id_product/orders/:id_order', postOrder);
router.get('/', getProducts);
router.get('/:id', getById);
router["delete"]('/:id', deleteProduct);
var _default = router;
exports["default"] = _default;