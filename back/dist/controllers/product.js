"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.getById = getById;
exports.deleteProduct = deleteProduct;
exports.postOrder = postOrder;
exports.postDiet = postDiet;
exports.postCategory = postCategory;

var _Product = _interopRequireDefault(require("../models/Product.js"));

var _Order = _interopRequireDefault(require("../models/Order.js"));

var _Diet = _interopRequireDefault(require("../models/Diet.js"));

var _Category = _interopRequireDefault(require("../models/Category.js"));

var _sequelize = require("sequelize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createProduct(_x, _x2) {
  return _createProduct.apply(this, arguments);
}

function _createProduct() {
  _createProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, price, description, image, stock, ids_categories, ids_diets, newProduct, categories, diets;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, price = _req$body.price, description = _req$body.description, image = _req$body.image, stock = _req$body.stock, ids_categories = _req$body.ids_categories, ids_diets = _req$body.ids_diets;
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

            if (!ids_categories) {
              _context.next = 11;
              break;
            }

            _context.next = 8;
            return _Category["default"].findAll({
              where: {
                id: ids_categories
              }
            });

          case 8:
            categories = _context.sent;
            _context.next = 11;
            return newProduct.addCategory(categories);

          case 11:
            if (!ids_diets) {
              _context.next = 17;
              break;
            }

            _context.next = 14;
            return _Diet["default"].findAll({
              where: {
                id: ids_diets
              }
            });

          case 14:
            diets = _context.sent;
            _context.next = 17;
            return newProduct.addDiet(diets);

          case 17:
            if (!newProduct) {
              _context.next = 19;
              break;
            }

            return _context.abrupt("return", res.json({
              message: 'Product created successfully',
              data: newProduct
            }));

          case 19:
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 21]]);
  }));
  return _createProduct.apply(this, arguments);
}

function getProducts(_x3, _x4) {
  return _getProducts.apply(this, arguments);
}

function _getProducts() {
  _getProducts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$query, name, id_category, id_diet, priceL, priceH, products, productsName, productsFound;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$query = req.query, name = _req$query.name, id_category = _req$query.id_category, id_diet = _req$query.id_diet, priceL = _req$query.priceL, priceH = _req$query.priceH;
            _context2.prev = 1;

            if (!(!id_category && !name && !id_diet)) {
              _context2.next = 8;
              break;
            }

            _context2.next = 5;
            return _Product["default"].findAll();

          case 5:
            products = _context2.sent;
            _context2.next = 30;
            break;

          case 8:
            if (!name) {
              _context2.next = 14;
              break;
            }

            _context2.next = 11;
            return _Product["default"].findAll({
              where: {
                name: _defineProperty({}, _sequelize.Op.iLike, "%".concat(name, "%"))
              }
            });

          case 11:
            products = _context2.sent;
            _context2.next = 30;
            break;

          case 14:
            if (!(id_category && id_diet)) {
              _context2.next = 20;
              break;
            }

            _context2.next = 17;
            return _Product["default"].findAll({
              include: [{
                model: _Category["default"],
                where: {
                  'id': id_category
                }
              }, {
                model: _Diet["default"],
                where: {
                  'id': id_diet
                }
              }]
            });

          case 17:
            products = _context2.sent;
            _context2.next = 30;
            break;

          case 20:
            if (!id_diet) {
              _context2.next = 26;
              break;
            }

            _context2.next = 23;
            return _Product["default"].findAll({
              include: [{
                model: _Diet["default"],
                through: {
                  attributes: []
                },
                where: {
                  'id': id_diet
                }
              }]
            });

          case 23:
            products = _context2.sent;
            _context2.next = 30;
            break;

          case 26:
            if (!id_category) {
              _context2.next = 30;
              break;
            }

            _context2.next = 29;
            return _Product["default"].findAll({
              include: [{
                model: _Category["default"],
                through: {
                  attributes: []
                },
                where: {
                  'id': id_category
                }
              }]
            });

          case 29:
            products = _context2.sent;

          case 30:
            if (!priceL) priceL = 0;

            if (priceH) {
              _context2.next = 35;
              break;
            }

            _context2.next = 34;
            return _Product["default"].max("price");

          case 34:
            priceH = _context2.sent;

          case 35:
            productsName = products.map(function (product) {
              return product.name;
            });
            _context2.next = 38;
            return _Product["default"].findAll({
              where: {
                name: productsName,
                price: _defineProperty({}, _sequelize.Op.between, [parseInt(priceL), parseInt(priceH)])
              }
            });

          case 38:
            productsFound = _context2.sent;
            return _context2.abrupt("return", res.status(200).send(productsFound));

          case 42:
            _context2.prev = 42;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 46:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 42]]);
  }));
  return _getProducts.apply(this, arguments);
}

function getById(_x5, _x6) {
  return _getById.apply(this, arguments);
}

function _getById() {
  _getById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, products;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _Product["default"].findByPk(id);

          case 4:
            products = _context3.sent;
            return _context3.abrupt("return", res.json(products));

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            console.error({
              err: _context3.t0
            });
            res.json(_context3.t0);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return _getById.apply(this, arguments);
}

function deleteProduct(_x7, _x8) {
  return _deleteProduct.apply(this, arguments);
} // export async function filterProductsbyCategory(req,res){
// const {id_category}=req.query
// try{
// let products=await Product.findAll({include: [ { 
//     model: Category,  
//     through: { attributes: [] },
//     where: { 'Category.id': id_category }
// } ]})
// return res.status(200).send(products)
//     }catch (err) {
//         console.log(err)
//         res.status(500).json({
//             message: 'Something goes Wrong',
//             data: {}
//         })
//     }
// }


function _deleteProduct() {
  _deleteProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, product;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _Product["default"].destroy({
              where: {
                id: id
              }
            });

          case 4:
            product = _context4.sent;
            return _context4.abrupt("return", res.json({
              message: 'Product deleted successfully',
              data: product
            }));

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
  return _deleteProduct.apply(this, arguments);
}

function postOrder(_x9, _x10) {
  return _postOrder.apply(this, arguments);
}

function _postOrder() {
  _postOrder = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$params, id_product, id_order, product, order, resultado;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$params = req.params, id_product = _req$params.id_product, id_order = _req$params.id_order;
            _context5.next = 3;
            return _Product["default"].findByPk(id_product);

          case 3:
            product = _context5.sent;
            _context5.next = 6;
            return _Order["default"].findByPk(id_order);

          case 6:
            order = _context5.sent;
            _context5.next = 9;
            return product.addOrder(order);

          case 9:
            resultado = _context5.sent;
            res.send(resultado);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _postOrder.apply(this, arguments);
}

function postDiet(_x11, _x12) {
  return _postDiet.apply(this, arguments);
}

function _postDiet() {
  _postDiet = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$params2, id_product, id_diet, product, diet, resultado;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$params2 = req.params, id_product = _req$params2.id_product, id_diet = _req$params2.id_diet;
            _context6.next = 3;
            return _Product["default"].findByPk(id_product);

          case 3:
            product = _context6.sent;
            _context6.next = 6;
            return _Diet["default"].findByPk(id_diet);

          case 6:
            diet = _context6.sent;
            _context6.next = 9;
            return product.addDiet(diet);

          case 9:
            resultado = _context6.sent;
            res.send(resultado);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _postDiet.apply(this, arguments);
}

function postCategory(_x13, _x14) {
  return _postCategory.apply(this, arguments);
}

function _postCategory() {
  _postCategory = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var _req$params3, id_product, id_category, product, category, resultado;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$params3 = req.params, id_product = _req$params3.id_product, id_category = _req$params3.id_category;
            _context7.next = 3;
            return _Product["default"].findByPk(id_product);

          case 3:
            product = _context7.sent;
            _context7.next = 6;
            return _Category["default"].findByPk(id_category);

          case 6:
            category = _context7.sent;
            _context7.next = 9;
            return product.addCategory(category);

          case 9:
            resultado = _context7.sent;
            res.send(resultado);

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _postCategory.apply(this, arguments);
}