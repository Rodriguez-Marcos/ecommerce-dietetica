"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrders = getOrders;
exports.deleteOrder = deleteOrder;
exports.changeOrderStatus = changeOrderStatus;

var _Order = _interopRequireDefault(require("../models/Order.js"));

var _Product_Order = _interopRequireDefault(require("../models/Product_Order.js"));

var _Product = _interopRequireDefault(require("../models/Product.js"));

var _Client = _interopRequireDefault(require("../models/Client.js"));

var _Product_Cart = _interopRequireDefault(require("../models/Product_Cart.js"));

var _Cart = _interopRequireDefault(require("../models/Cart.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// export async function createOrder(req, res) { //createOrder and empty Cart
//     const id_client = req.id
//     const { shippingAddress } = req.body;
//     try {
//         let cart = await Cart.findOne({where:{ id_client: id_client}})
//         let products = await Product_Cart.findAll({ where: { id_cart: cart.dataValues.id }, attributes: ["id_product", "quantity"] })
//         await Order.create({
//             shippingAddress: shippingAddress,
//             id_client: id_client
//         }
//         )
//         let newOrderId = await Order.findOne({ where: { id_client: id_client }, attributes: ["id"], order: [["createDate", "DESC"]], limit: 1 })
//         let promises = Promise.all(products.map(async productOrder => {
//             let quantity = await Product.findOne({ where: { id: productOrder.id_product }, attributes: ["stock", "price"] })
//             let newProduct_Order = await Product_Order.create({ total: productOrder.quantity * quantity.dataValues.price, quantity: productOrder.quantity, id_product: productOrder.id_product, id_order: newOrderId.dataValues.id })
//             let newQuantity = quantity.dataValues.stock - productOrder.quantity
//             await Product.update({ stock: newQuantity }, { where: { id: productOrder.id_product } })
//             return newProduct_Order
//         }))
//         let promisesResolved = await promises
//         if (promisesResolved) {
//             let totalValue = await Product_Order.sum('total', { where: { id_order: newOrderId.dataValues.id } })
//             await Order.update({ ammount: totalValue }, { where: { id: newOrderId.dataValues.id } })
//             let updatedOrder = await Order.findOne(
//                 {
//                     where: { id_client: id_client },
//                     attributes: ["id", "ammount", "shippingAddress", "createDate", "status"],
//                     include: [
//                         { model: Client, attributes: ["id", "name", "lastname", "email", "phone"] },
//                         {
//                             model: Product, attributes: ["id", "name", "price", "description"],
//                             through: { attributes: ["quantity", "total"] }
//                         }],
//                     order: [["createDate", "DESC"]],
//                     limit: 1
//                 })
//                 let cart = await Cart.findByPk(id_client)
//                 console.log(cart)
//                  let products = await Product.findAll() 
//                 await cart.removeProduct(products)
//                 await Cart.destroy(totalAmount,{where:{id_client:id_client}}) 
//             return res.json({
//                 message: 'Order created successfully',
//                 data: updatedOrder
//             })
//         }
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({
//             message: 'Something goes Wrong',
//             data: {}
//         })
//     }
// }
function getOrders(_x, _x2) {
  return _getOrders.apply(this, arguments);
}

function _getOrders() {
  _getOrders = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$query, id_client, id_order, orders;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query = req.query, id_client = _req$query.id_client, id_order = _req$query.id_order;
            _context.prev = 1;

            if (!(!id_client && !id_order)) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return _Order["default"].findAll({
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
              order: [["createDate", "DESC"]]
            });

          case 5:
            orders = _context.sent;
            _context.next = 18;
            break;

          case 8:
            if (!(id_client && !id_order)) {
              _context.next = 14;
              break;
            }

            _context.next = 11;
            return _Order["default"].findAll({
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
              order: [["createDate", "DESC"]]
            });

          case 11:
            orders = _context.sent;
            _context.next = 18;
            break;

          case 14:
            if (!(!id_client && id_order)) {
              _context.next = 18;
              break;
            }

            _context.next = 17;
            return _Order["default"].findOne({
              where: {
                id: id_order
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
              }]
            });

          case 17:
            orders = _context.sent;

          case 18:
            return _context.abrupt("return", res.status(200).send(orders));

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
  return _getOrders.apply(this, arguments);
}

function deleteOrder(_x3, _x4) {
  return _deleteOrder.apply(this, arguments);
}

function _deleteOrder() {
  _deleteOrder = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, order;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.prev = 1;
            _context2.next = 4;
            return _Order["default"].destroy({
              where: {
                id: id
              }
            });

          case 4:
            order = _context2.sent;
            return _context2.abrupt("return", res.json({
              message: 'Order deleted successfully',
              data: order
            }));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return _deleteOrder.apply(this, arguments);
}

function changeOrderStatus(_x5, _x6) {
  return _changeOrderStatus.apply(this, arguments);
}

function _changeOrderStatus() {
  _changeOrderStatus = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, status, order;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            status = req.body.status;
            _context3.prev = 2;
            _context3.next = 5;
            return _Order["default"].update({
              status: status
            }, {
              where: {
                id: id
              }
            });

          case 5:
            _context3.next = 7;
            return _Order["default"].findOne({
              where: {
                id: id
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
              }]
            });

          case 7:
            order = _context3.sent;
            return _context3.abrupt("return", res.status(200).send(order));

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](2);
            console.log(_context3.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 11]]);
  }));
  return _changeOrderStatus.apply(this, arguments);
}