"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFavorite = createFavorite;
exports.getFavorites = getFavorites;

var _Favorite = _interopRequireDefault(require("../models/Favorite.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createFavorite(_x, _x2) {
  return _createFavorite.apply(this, arguments);
}

function _createFavorite() {
  _createFavorite = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var id_client, newFavorite;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id_client = req.params.id_client;
            _context.prev = 1;
            _context.next = 4;
            return _Favorite["default"].create({
              'id_client': id_client
            });

          case 4:
            newFavorite = _context.sent;

            if (!newFavorite) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.json({
              message: 'Favorite created successfully',
              data: newFavorite
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
  return _createFavorite.apply(this, arguments);
}

function getFavorites(_x3, _x4) {
  return _getFavorites.apply(this, arguments);
}

function _getFavorites() {
  _getFavorites = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var favorite;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Favorite["default"].findAll();

          case 3:
            favorite = _context2.sent;
            return _context2.abrupt("return", res.status(200).send(favorite));

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
  return _getFavorites.apply(this, arguments);
}