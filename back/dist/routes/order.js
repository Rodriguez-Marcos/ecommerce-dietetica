"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/order'),
    createOrder = _require2.createOrder,
    getOrders = _require2.getOrders,
    deleteOrder = _require2.deleteOrder;

var router = Router();
router.post('/', createOrder);
router.get('/', getOrders);
router["delete"]('/:id', deleteOrder);
var _default = router;
exports["default"] = _default;