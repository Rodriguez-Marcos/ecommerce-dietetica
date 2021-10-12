"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToFavorite = addToFavorite;
exports.removeFromFavorite = removeFromFavorite;
exports.getFavorite = getFavorite;

var _Favorite = _interopRequireDefault(require("../models/Favorite.js"));

var _Product = _interopRequireDefault(require("../models/Product.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function addToFavorite(_x, _x2, _x3) {
  return _addToFavorite.apply(this, arguments);
}

function _addToFavorite() {
  _addToFavorite = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var id_client, id_products, favorite, products;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id_client = req.id;
            id_products = req.body.id_products;
            _context.prev = 2;
            _context.next = 5;
            return _Favorite["default"].findByPk(id_client);

          case 5:
            favorite = _context.sent;
            _context.next = 8;
            return _Product["default"].findAll({
              where: {
                id: id_products
              }
            });

          case 8:
            products = _context.sent;
            _context.next = 11;
            return favorite.addProduct(products);

          case 11:
            return _context.abrupt("return", res.json({
              message: 'Product added successfully',
              data: products
            }));

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 14]]);
  }));
  return _addToFavorite.apply(this, arguments);
}

function removeFromFavorite(_x4, _x5, _x6) {
  return _removeFromFavorite.apply(this, arguments);
}

function _removeFromFavorite() {
  _removeFromFavorite = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var id_client, id_products, favorite, products;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id_client = req.id;
            id_products = req.body.id_products;
            _context2.prev = 2;
            _context2.next = 5;
            return _Favorite["default"].findByPk(id_client);

          case 5:
            favorite = _context2.sent;
            _context2.next = 8;
            return _Product["default"].findAll({
              where: {
                id: id_products
              }
            });

          case 8:
            products = _context2.sent;
            _context2.next = 11;
            return favorite.removeProduct(products);

          case 11:
            return _context2.abrupt("return", res.json({
              message: 'Product removed successfully',
              data: products
            }));

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 14]]);
  }));
  return _removeFromFavorite.apply(this, arguments);
}

function getFavorite(_x7, _x8) {
  return _getFavorite.apply(this, arguments);
}

function _getFavorite() {
  _getFavorite = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id_client, favorite;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id_client = req.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _Favorite["default"].findAll({
              where: {
                id_client: id_client
              },
              include: [{
                model: _Product["default"]
              }]
            });

          case 4:
            favorite = _context3.sent;
            return _context3.abrupt("return", res.status(200).send(cart));

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
  return _getFavorite.apply(this, arguments);
}