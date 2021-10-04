"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addReview = addReview;
exports.getReview = getReview;

var _Review = _interopRequireDefault(require("../models/Review.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function addReview(_x, _x2, _x3) {
  return _addReview.apply(this, arguments);
}

function _addReview() {
  _addReview = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var review, id, newReview;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            review = req.body;
            id = req.params.id;
            _context.prev = 2;
            _context.next = 5;
            return _Review["default"].create(_objectSpread(_objectSpread({}, review), {}, {
              id_product: id
            }));

          case 5:
            newReview = _context.sent;
            return _context.abrupt("return", res.status(200).json(newReview));

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", res.json(_context.t0));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9]]);
  }));
  return _addReview.apply(this, arguments);
}

;

function getReview(_x4, _x5) {
  return _getReview.apply(this, arguments);
}

function _getReview() {
  _getReview = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, reviews;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.prev = 1;
            _context2.next = 4;
            return _Review["default"].findAll({
              where: {
                id_product: id
              }
            });

          case 4:
            reviews = _context2.sent;

            if (!reviews) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.json({
              message: 'Reviews found',
              data: reviews
            }));

          case 7:
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 9]]);
  }));
  return _getReview.apply(this, arguments);
}