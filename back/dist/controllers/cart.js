"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToCart = addToCart;
exports.getCarts = getCarts;

var _Cart = _interopRequireDefault(require("../models/Cart.js"));

var _Product = _interopRequireDefault(require("../models/Product.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function addToCart(_x, _x2) {
  return _addToCart.apply(this, arguments);
}

function _addToCart() {
  _addToCart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$params, id_client, id_product, cart, product;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$params = req.params, id_client = _req$params.id_client, id_product = _req$params.id_product;
            _context.prev = 1;
            _context.next = 4;
            return _Cart["default"].findByPk(id_client);

          case 4:
            cart = _context.sent;
            _context.next = 7;
            return _Product["default"].findByPk(id_product);

          case 7:
            product = _context.sent;
            _context.next = 10;
            return cart.addProduct(product);

          case 10:
            return _context.abrupt("return", res.json({
              message: 'Product added successfully',
              data: product
            }));

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 13]]);
  }));
  return _addToCart.apply(this, arguments);
}

function getCarts(_x3, _x4) {
  return _getCarts.apply(this, arguments);
}

function _getCarts() {
  _getCarts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var carts;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Cart["default"].findAll();

          case 3:
            carts = _context2.sent;
            return _context2.abrupt("return", res.status(200).send(carts));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return _getCarts.apply(this, arguments);
}