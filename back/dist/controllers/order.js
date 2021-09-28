"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrder = createOrder;
exports.getOrders = getOrders;
exports.deleteOrder = deleteOrder;

var _Order = _interopRequireDefault(require("../models/Order.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createOrder(_x, _x2) {
  return _createOrder.apply(this, arguments);
}

function _createOrder() {
  _createOrder = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, ammount, shippingAddress, createDate, status, id_client, newOrder;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, ammount = _req$body.ammount, shippingAddress = _req$body.shippingAddress, createDate = _req$body.createDate, status = _req$body.status, id_client = _req$body.id_client;
            _context.prev = 1;
            _context.next = 4;
            return _Order["default"].create({
              ammount: ammount,
              shippingAddress: shippingAddress,
              createDate: createDate,
              status: status,
              id_client: id_client
            }, {
              fields: ['ammount', 'shippingAddress', 'createDate', 'status', 'id_client']
            });

          case 4:
            newOrder = _context.sent;

            if (!newOrder) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.json({
              message: 'Order created successfully',
              data: newOrder
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
  return _createOrder.apply(this, arguments);
}

function getOrders(_x3, _x4) {
  return _getOrders.apply(this, arguments);
}

function _getOrders() {
  _getOrders = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var orders;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Order["default"].findAll();

          case 3:
            orders = _context2.sent;
            return _context2.abrupt("return", res.status(200).send(orders));

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
  return _getOrders.apply(this, arguments);
}

function deleteOrder(_x5, _x6) {
  return _deleteOrder.apply(this, arguments);
}

function _deleteOrder() {
  _deleteOrder = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, order;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _Order["default"].destroy({
              where: {
                id: id
              }
            });

          case 4:
            order = _context3.sent;
            return _context3.abrupt("return", res.json({
              message: 'Order deleted successfully',
              data: order
            }));

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return _deleteOrder.apply(this, arguments);
}