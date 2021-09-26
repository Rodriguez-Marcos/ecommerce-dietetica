"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProduct = createProduct;
exports.postOrder = postOrder;
exports.postDiet = postDiet;
exports.postCategory = postCategory;

var _Product = _interopRequireDefault(require("../models/Product.js"));

var _Order = _interopRequireDefault(require("../models/Order.js"));

var _Diet = _interopRequireDefault(require("../models/Diet.js"));

var _Category = _interopRequireDefault(require("../models/Category.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createProduct(_x, _x2) {
  return _createProduct.apply(this, arguments);
}

function _createProduct() {
  _createProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, price, description, image, stock, newProduct;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, price = _req$body.price, description = _req$body.description, image = _req$body.image, stock = _req$body.stock;
            _context.prev = 1;
            _context.next = 4;
            return _Product["default"].create({
              name: name,
              price: price,
              description: description,
              image: image,
              stock: stock
            }, {
              fields: ['name', 'price', 'description', 'image', 'stock']
            });

          case 4:
            newProduct = _context.sent;

            if (!newProduct) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.json({
              message: 'Product created successfully',
              data: newProduct
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
  return _createProduct.apply(this, arguments);
}

function postOrder(_x3, _x4) {
  return _postOrder.apply(this, arguments);
}

function _postOrder() {
  _postOrder = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$params, id_product, id_order, product, order, resultado;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$params = req.params, id_product = _req$params.id_product, id_order = _req$params.id_order;
            _context2.next = 3;
            return _Product["default"].findByPk(id_product);

          case 3:
            product = _context2.sent;
            _context2.next = 6;
            return _Order["default"].findByPk(id_order);

          case 6:
            order = _context2.sent;
            _context2.next = 9;
            return product.addOrder(order);

          case 9:
            resultado = _context2.sent;
            res.send(resultado);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _postOrder.apply(this, arguments);
}

function postDiet(_x5, _x6) {
  return _postDiet.apply(this, arguments);
}

function _postDiet() {
  _postDiet = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$params2, id_product, id_diet, product, diet, resultado;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$params2 = req.params, id_product = _req$params2.id_product, id_diet = _req$params2.id_diet;
            _context3.next = 3;
            return _Product["default"].findByPk(id_product);

          case 3:
            product = _context3.sent;
            _context3.next = 6;
            return _Diet["default"].findByPk(id_diet);

          case 6:
            diet = _context3.sent;
            _context3.next = 9;
            return product.addDiet(diet);

          case 9:
            resultado = _context3.sent;
            res.send(resultado);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _postDiet.apply(this, arguments);
}

function postCategory(_x7, _x8) {
  return _postCategory.apply(this, arguments);
}

function _postCategory() {
  _postCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$params3, id_product, id_category, product, category, resultado;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$params3 = req.params, id_product = _req$params3.id_product, id_category = _req$params3.id_category;
            _context4.next = 3;
            return _Product["default"].findByPk(id_product);

          case 3:
            product = _context4.sent;
            _context4.next = 6;
            return _Category["default"].findByPk(id_category);

          case 6:
            category = _context4.sent;
            _context4.next = 9;
            return product.addCategory(category);

          case 9:
            resultado = _context4.sent;
            res.send(resultado);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _postCategory.apply(this, arguments);
}