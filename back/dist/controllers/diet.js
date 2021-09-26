"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDiet = createDiet;

var _Diet = _interopRequireDefault(require("../models/Diet.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createDiet(_x, _x2) {
  return _createDiet.apply(this, arguments);
}

function _createDiet() {
  _createDiet = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, description, newDiet;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, description = _req$body.description;
            _context.prev = 1;
            _context.next = 4;
            return _Diet["default"].create({
              name: name,
              description: description
            }, {
              fields: ['name', 'description']
            });

          case 4:
            newDiet = _context.sent;

            if (!newDiet) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.json({
              message: 'Diet created successfully',
              data: newDiet
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
  return _createDiet.apply(this, arguments);
}