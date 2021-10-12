"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = mercadopago;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var axios = require('axios');

function mercadopago(_x, _x2) {
  return _mercadopago.apply(this, arguments);
}

function _mercadopago() {
  _mercadopago = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cart, res) {
    var data, items, config;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            items = [];
            cart.map(function (x) {
              return items.push({
                'title': x.name,
                'unit_price': x.price,
                quantity: x.products_cart.quantity
              });
            });
            data = JSON.stringify({
              items: items,
              back_urls: {
                "success": "/feedback",
                "failure": "/feedback",
                "pending": "/feedback"
              },
              auto_return: "approved"
            });
            config = {
              method: 'post',
              url: 'https://api.mercadolibre.com/checkout/preferences?access_token=TEST-5696918278609575-100703-7b51b60c619120f4ad54b55d52a30324-169898531',
              headers: {
                'Content-Type': 'application/json'
              },
              data: data
            };
            axios(config).then(function (response) {
              return res.status(200).json(response.data.init_point);
            })["catch"](function (error) {
              console.log(error);
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _mercadopago.apply(this, arguments);
}

;