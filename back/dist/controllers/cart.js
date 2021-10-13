"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToCart = addToCart;
exports.removeFromCart = removeFromCart;
exports.getCart = getCart;
exports.emptyCart = emptyCart;

var _Cart = _interopRequireDefault(require("../models/Cart.js"));

var _Product = _interopRequireDefault(require("../models/Product.js"));

var _Product_Cart = _interopRequireDefault(require("../models/Product_Cart.js"));

var _Order = _interopRequireDefault(require("../models/Order.js"));

var _Product_Order = _interopRequireDefault(require("../models/Product_Order.js"));

var _Client = _interopRequireDefault(require("../models/Client.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function addToCart(_x, _x2, _x3) {
  return _addToCart.apply(this, arguments);
}

function _addToCart() {
  _addToCart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var id_client, productsArray, cart, promises, promisesResolved, totalValue, updatedCart, products, _cart, productEx, quantity, newProduct_Cart, _totalValue, _updatedCart;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id_client = req.id;
            productsArray = [];
            _context2.prev = 2;

            if (!Array.isArray(req.body.products)) {
              _context2.next = 24;
              break;
            }

            // [{id:1,quantity:1}]
            productsArray = req.body.products;
            _context2.next = 7;
            return _Cart["default"].findOne({
              where: {
                id_client: id_client
              }
            });

          case 7:
            cart = _context2.sent;
            promises = Promise.all(productsArray.map( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(product) {
                var productEx, quantity, _newProduct_Cart, _newProduct_Cart2;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _Product_Cart["default"].findOne({
                          where: {
                            id_cart: cart.dataValues.id,
                            id_product: product.id
                          }
                        });

                      case 2:
                        productEx = _context.sent;
                        _context.next = 5;
                        return _Product["default"].findOne({
                          where: {
                            id: product.id
                          },
                          attributes: ["stock", "price"]
                        });

                      case 5:
                        quantity = _context.sent;

                        if (!(quantity.dataValues.stock <= 0)) {
                          _context.next = 8;
                          break;
                        }

                        return _context.abrupt("return", "producto no disponible por el momento");

                      case 8:
                        if (productEx) {
                          _context.next = 15;
                          break;
                        }

                        _context.next = 11;
                        return _Product_Cart["default"].create({
                          total: product.quantity * quantity.dataValues.price,
                          quantity: product.quantity,
                          id_product: product.id,
                          id_cart: cart.dataValues.id
                        });

                      case 11:
                        _newProduct_Cart = _context.sent;
                        return _context.abrupt("return", _newProduct_Cart);

                      case 15:
                        _context.next = 17;
                        return _Product_Cart["default"].update({
                          total: productEx.dataValues.total + product.quantity * quantity.dataValues.price,
                          quantity: product.quantity
                        }, {
                          where: {
                            id_cart: cart.dataValues.id,
                            id_product: product.id
                          }
                        });

                      case 17:
                        _newProduct_Cart2 = _context.sent;
                        return _context.abrupt("return", _newProduct_Cart2);

                      case 19:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x12) {
                return _ref.apply(this, arguments);
              };
            }()));
            _context2.next = 11;
            return promises;

          case 11:
            promisesResolved = _context2.sent;

            if (!promisesResolved) {
              _context2.next = 22;
              break;
            }

            _context2.next = 15;
            return _Product_Cart["default"].sum('total', {
              where: {
                id_cart: cart.dataValues.id
              }
            });

          case 15:
            totalValue = _context2.sent;
            _context2.next = 18;
            return _Cart["default"].update({
              totalAmount: totalValue
            }, {
              where: {
                id: cart.dataValues.id
              }
            });

          case 18:
            _context2.next = 20;
            return _Cart["default"].findOne({
              where: {
                id_client: id_client
              },
              include: [{
                model: _Product["default"]
              }]
            });

          case 20:
            updatedCart = _context2.sent;
            return _context2.abrupt("return", res.json({
              message: 'Cart uploaded successfully',
              data: updatedCart
            }));

          case 22:
            _context2.next = 56;
            break;

          case 24:
            products = req.body.products;
            console.log(products);
            _context2.next = 28;
            return _Cart["default"].findOne({
              where: {
                id_client: id_client
              }
            });

          case 28:
            _cart = _context2.sent;
            _context2.next = 31;
            return _Product_Cart["default"].findOne({
              where: {
                id_cart: _cart.dataValues.id,
                id_product: products.id
              }
            });

          case 31:
            productEx = _context2.sent;
            _context2.next = 34;
            return _Product["default"].findOne({
              where: {
                id: products.id
              },
              attributes: ["stock", "price"]
            });

          case 34:
            quantity = _context2.sent;

            if (!(quantity.dataValues.stock <= 0)) {
              _context2.next = 37;
              break;
            }

            return _context2.abrupt("return", "producto no disponible por el momento");

          case 37:
            if (productEx) {
              _context2.next = 43;
              break;
            }

            _context2.next = 40;
            return _Product_Cart["default"].create({
              total: products.quantity * quantity.dataValues.price,
              quantity: products.quantity,
              id_product: products.id,
              id_cart: _cart.dataValues.id
            });

          case 40:
            newProduct_Cart = _context2.sent;
            _context2.next = 46;
            break;

          case 43:
            _context2.next = 45;
            return _Product_Cart["default"].update({
              total: productEx.dataValues.total + products.quantity * quantity.dataValues.price,
              quantity: products.quantity
            }, {
              where: {
                id_cart: _cart.dataValues.id,
                id_product: products.id
              }
            });

          case 45:
            newProduct_Cart = _context2.sent;

          case 46:
            if (!newProduct_Cart) {
              _context2.next = 56;
              break;
            }

            _context2.next = 49;
            return _Product_Cart["default"].sum('total', {
              where: {
                id_cart: _cart.dataValues.id
              }
            });

          case 49:
            _totalValue = _context2.sent;
            _context2.next = 52;
            return _Cart["default"].update({
              totalAmount: _totalValue
            }, {
              where: {
                id: _cart.dataValues.id
              }
            });

          case 52:
            _context2.next = 54;
            return _Cart["default"].findOne({
              where: {
                id_client: id_client
              },
              include: [{
                model: _Product["default"]
              }]
            });

          case 54:
            _updatedCart = _context2.sent;
            return _context2.abrupt("return", res.json({
              message: 'Cart uploaded successfully',
              data: _updatedCart
            }));

          case 56:
            _context2.next = 62;
            break;

          case 58:
            _context2.prev = 58;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 62:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 58]]);
  }));
  return _addToCart.apply(this, arguments);
}

function removeFromCart(_x4, _x5, _x6) {
  return _removeFromCart.apply(this, arguments);
}

function _removeFromCart() {
  _removeFromCart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var id_client, id_products, cart, products;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id_client = req.id;
            id_products = req.body.id_products;
            _context3.prev = 2;
            _context3.next = 5;
            return _Cart["default"].findByPk(id_client);

          case 5:
            cart = _context3.sent;
            _context3.next = 8;
            return _Product["default"].findAll({
              where: {
                id: id_products
              }
            });

          case 8:
            products = _context3.sent;
            _context3.next = 11;
            return cart.removeProduct(products);

          case 11:
            return _context3.abrupt("return", res.json({
              message: 'Product removed successfully',
              data: products
            }));

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](2);
            console.log(_context3.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 14]]);
  }));
  return _removeFromCart.apply(this, arguments);
}

function getCart(_x7, _x8) {
  return _getCart.apply(this, arguments);
}

function _getCart() {
  _getCart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id_client, cart;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id_client = req.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _Cart["default"].findAll({
              where: {
                id_client: id_client
              },
              include: [{
                model: _Product["default"]
              }]
            });

          case 4:
            cart = _context4.sent;
            return _context4.abrupt("return", res.status(200).send(cart));

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));
  return _getCart.apply(this, arguments);
}

function emptyCart(_x9, _x10, _x11) {
  return _emptyCart.apply(this, arguments);
}

function _emptyCart() {
  _emptyCart = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
    var id_client, shippingAddress, cart, products, newOrderId, promises, promisesResolved, totalValue, updatedOrder, _cart2, _products;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id_client = req.id;
            shippingAddress = "Direccion de prueba";
            _context6.prev = 2;
            _context6.next = 5;
            return _Cart["default"].findOne({
              where: {
                id_client: id_client
              }
            });

          case 5:
            cart = _context6.sent;
            _context6.next = 8;
            return _Product_Cart["default"].findAll({
              where: {
                id_cart: cart.dataValues.id
              },
              attributes: ["id_product", "quantity"]
            });

          case 8:
            products = _context6.sent;
            console.log(products);
            _context6.next = 12;
            return _Order["default"].create({
              shippingAddress: shippingAddress,
              id_client: id_client
            });

          case 12:
            _context6.next = 14;
            return _Order["default"].findOne({
              where: {
                id_client: id_client
              },
              attributes: ["id"],
              order: [["createDate", "DESC"]],
              limit: 1
            });

          case 14:
            newOrderId = _context6.sent;
            promises = Promise.all(products.map( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(productOrder) {
                var quantity, newProduct_Order, newQuantity;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return _Product["default"].findOne({
                          where: {
                            id: productOrder.id_product
                          },
                          attributes: ["stock", "price"]
                        });

                      case 2:
                        quantity = _context5.sent;
                        _context5.next = 5;
                        return _Product_Order["default"].create({
                          total: productOrder.quantity * quantity.dataValues.price,
                          quantity: productOrder.quantity,
                          id_product: productOrder.id_product,
                          id_order: newOrderId.dataValues.id
                        });

                      case 5:
                        newProduct_Order = _context5.sent;
                        newQuantity = quantity.dataValues.stock - productOrder.quantity;
                        _context5.next = 9;
                        return _Product["default"].update({
                          stock: newQuantity
                        }, {
                          where: {
                            id: productOrder.id_product
                          }
                        });

                      case 9:
                        return _context5.abrupt("return", newProduct_Order);

                      case 10:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x13) {
                return _ref2.apply(this, arguments);
              };
            }()));
            _context6.next = 18;
            return promises;

          case 18:
            promisesResolved = _context6.sent;

            if (!promisesResolved) {
              _context6.next = 40;
              break;
            }

            _context6.next = 22;
            return _Product_Order["default"].sum('total', {
              where: {
                id_order: newOrderId.dataValues.id
              }
            });

          case 22:
            totalValue = _context6.sent;
            _context6.next = 25;
            return _Order["default"].update({
              ammount: totalValue
            }, {
              where: {
                id: newOrderId.dataValues.id
              }
            });

          case 25:
            _context6.next = 27;
            return _Order["default"].findOne({
              where: {
                id_client: id_client
              },
              attributes: ["id", "ammount", "shippingAddress", "createDate", "status"],
              include: [{
                model: _Client["default"],
                attributes: ["id", "name", "lastname", "email", "phone"]
              }, {
                model: _Product["default"],
                attributes: ["id", "name", "price", "description"],
                through: {
                  attributes: ["quantity", "total"]
                }
              }],
              order: [["createDate", "DESC"]],
              limit: 1
            });

          case 27:
            updatedOrder = _context6.sent;
            _context6.next = 30;
            return _Cart["default"].findByPk(id_client);

          case 30:
            _cart2 = _context6.sent;
            console.log(_cart2);
            _context6.next = 34;
            return _Product["default"].findAll();

          case 34:
            _products = _context6.sent;
            _context6.next = 37;
            return _cart2.removeProduct(_products);

          case 37:
            _context6.next = 39;
            return _Cart["default"].update({
              totalAmount: 0
            }, {
              where: {
                id_client: id_client
              }
            });

          case 39:
            return _context6.abrupt("return", res.json({
              message: 'Order created successfully',
              data: updatedOrder
            }));

          case 40:
            _context6.next = 46;
            break;

          case 42:
            _context6.prev = 42;
            _context6.t0 = _context6["catch"](2);
            console.log(_context6.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 46:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 42]]);
  }));
  return _emptyCart.apply(this, arguments);
}