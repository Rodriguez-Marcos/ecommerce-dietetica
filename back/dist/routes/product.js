"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/product'),
    createProduct = _require2.createProduct,
    postOrder = _require2.postOrder,
    postDiet = _require2.postDiet,
    postCategory = _require2.postCategory;

var router = Router();
router.post('/', createProduct);
router.post('/:id_product/orders/:id_order', postOrder);
router.post('/:id_product/diets/:id_diet', postDiet);
router.post('/:id_product/categories/:id_category', postCategory);
var _default = router;
exports["default"] = _default;