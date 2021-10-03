"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCart = createCart;
exports.getCarts = getCarts;

var _Cart = _interopRequireDefault(require("../models/Cart.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createCart(_x, _x2) {
  return _createCart.apply(this, arguments);
}

function _createCart() {
  _createCart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var id_client, newCart;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id_client = req.params.id_client;
            _context.prev = 1;
            _context.next = 4;
            return _Cart["default"].create({
              'id_client': id_client
            });

          case 4:
            newCart = _context.sent;

            if (!newCart) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.json({
              message: 'Cart created successfully',
              data: newCart
            }));

          case 7:
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _createCart.apply(this, arguments);
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