"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cart = require("../controllers/cart");

var _payment = _interopRequireDefault(require("../controllers/payment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _require = require('express'),
    Router = _require.Router;

var router = Router();
router.post('/', _payment["default"]);
router.get('/success', _cart.emptyCart);
var _default = router;
exports["default"] = _default;