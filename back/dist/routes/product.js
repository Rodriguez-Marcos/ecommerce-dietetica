"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _useExtractor = _interopRequireDefault(require("../middleware/useExtractor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/product'),
    createProduct = _require2.createProduct,
    getProducts = _require2.getProducts,
    getById = _require2.getById,
    deleteProduct = _require2.deleteProduct,
    postOrder = _require2.postOrder,
    updateProduct = _require2.updateProduct;

var router = Router();
router.post('/', _useExtractor["default"], createProduct);
router.post('/getProducts', getProducts);
router.post('/:id_product/orders/:id_order', postOrder);
router.get('/', getProducts);
router.get('/:id', getById);
router["delete"]('/:id', _useExtractor["default"], deleteProduct);
router.put('/:id', updateProduct);
var _default = router;
exports["default"] = _default;