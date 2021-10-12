"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = payment;

var _Cart = _interopRequireDefault(require("../models/Cart"));

var _Product = _interopRequireDefault(require("../models/Product"));

var _Product_Cart = _interopRequireDefault(require("../models/Product_Cart"));

var _Product_Order = _interopRequireDefault(require("../models/Product_Order"));

var _mercadopago = _interopRequireDefault(require("../utils/mercadopago"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function payment(_x, _x2, _x3) {
  return _payment.apply(this, arguments);
}

function _payment() {
  _payment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var id_client, cart;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id_client = req.id;
            _context.prev = 1;
            _context.next = 4;
            return _Cart["default"].findOne({
              where: {
                id_client: id_client
              },
              include: [{
                model: _Product["default"]
              }]
            });

          case 4:
            cart = _context.sent;
            (0, _mercadopago["default"])(cart.products, res);
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));
  return _payment.apply(this, arguments);
}