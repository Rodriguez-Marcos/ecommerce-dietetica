"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createClient = createClient;
exports.getClients = getClients;
exports.deleteClient = deleteClient;
exports.loginUser = loginUser;
exports.loginBygoogle = loginBygoogle;
exports.createClientGoogle = createClientGoogle;

var _Client = _interopRequireDefault(require("../models/Client.js"));

var _Clientbygoogle = _interopRequireDefault(require("../models/Clientbygoogle.js"));

var _Cart = _interopRequireDefault(require("../models/Cart.js"));

var _Favorite = _interopRequireDefault(require("../models/Favorite.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bcrypt = require('bcrypt');

function createClient(_x, _x2) {
  return _createClient.apply(this, arguments);
}

function _createClient() {
  _createClient = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, lastname, email, password, address, phone, dateBaseByClient, newClient, client_id;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, lastname = _req$body.lastname, email = _req$body.email, password = _req$body.password, address = _req$body.address, phone = _req$body.phone;
            _context.next = 3;
            return bcrypt.hash(password, 10);

          case 3:
            password = _context.sent;
            _context.next = 6;
            return _Client["default"].findOne({
              where: {
                email: email
              }
            });

          case 6:
            dateBaseByClient = _context.sent;

            if (dateBaseByClient) {
              _context.next = 32;
              break;
            }

            _context.prev = 8;
            _context.next = 11;
            return _Client["default"].create({
              name: name,
              lastname: lastname,
              email: email,
              password: password,
              address: address,
              phone: phone
            }, {
              fields: ['name', 'lastname', 'email', 'password', 'address', 'phone']
            });

          case 11:
            newClient = _context.sent;

            if (!newClient) {
              _context.next = 23;
              break;
            }

            _context.next = 15;
            return _Client["default"].findOne({
              where: {
                name: newClient.name
              },
              attributes: ['id']
            });

          case 15:
            client_id = _context.sent;
            _context.next = 18;
            return _Cart["default"].create({
              id_client: client_id.dataValues.id
            });

          case 18:
            _context.next = 20;
            return _Favorite["default"].create({
              id_client: client_id.dataValues.id
            });

          case 20:
            return _context.abrupt("return", res.json({
              message: 'Client created successfully',
              data: newClient
            }));

          case 23:
            return _context.abrupt("return", res.json({
              message: 'Usuario ya creado'
            }));

          case 24:
            _context.next = 30;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](8);
            console.log(_context.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 30:
            _context.next = 33;
            break;

          case 32:
            return _context.abrupt("return", res.json({
              message: 'Usuario ya creado'
            }));

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 26]]);
  }));
  return _createClient.apply(this, arguments);
}

function getClients(_x3, _x4) {
  return _getClients.apply(this, arguments);
}

function _getClients() {
  _getClients = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var clients;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Client["default"].findAll();

          case 3:
            clients = _context2.sent;
            return _context2.abrupt("return", res.status(200).send(clients));

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
  return _getClients.apply(this, arguments);
}

function deleteClient(_x5, _x6) {
  return _deleteClient.apply(this, arguments);
}

function _deleteClient() {
  _deleteClient = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, client;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _Client["default"].destroy({
              where: {
                id: id
              }
            });

          case 4:
            client = _context3.sent;
            return _context3.abrupt("return", res.json({
              message: 'Client deleted successfully',
              data: client
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
  return _deleteClient.apply(this, arguments);
}

function loginUser(_x7, _x8) {
  return _loginUser.apply(this, arguments);
}

function _loginUser() {
  _loginUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$query, email, password, dateBaseByClient;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$query = req.query, email = _req$query.email, password = _req$query.password;
            _context4.next = 3;
            return _Client["default"].findOne({
              where: {
                email: email
              }
            });

          case 3:
            dateBaseByClient = _context4.sent;
            _context4.next = 6;
            return bcrypt.compare(password, dateBaseByClient.password);

          case 6:
            password = _context4.sent;
            _context4.prev = 7;

            if (!password) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt("return", res.json({
              message: 'User Login',
              data: dateBaseByClient
            }));

          case 12:
            return _context4.abrupt("return", res.json({
              message: 'User Login failed'
            }));

          case 13:
            _context4.next = 19;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](7);
            res.status(404).send(_context4.t0);
            console.log(_context4.t0);

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[7, 15]]);
  }));
  return _loginUser.apply(this, arguments);
}

function loginBygoogle(_x9, _x10) {
  return _loginBygoogle.apply(this, arguments);
}

function _loginBygoogle() {
  _loginBygoogle = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body2, googleId, email, dateBaseByGoogle;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, googleId = _req$body2.googleId, email = _req$body2.email;
            _context5.next = 3;
            return _Clientbygoogle["default"].findOne({
              where: {
                email: email,
                googleId: googleId
              }
            });

          case 3:
            dateBaseByGoogle = _context5.sent;
            _context5.prev = 4;

            if (!dateBaseByGoogle) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", res.json({
              message: 'User Login',
              data: dateBaseByGoogle
            }));

          case 9:
            return _context5.abrupt("return", res.json({
              message: 'User Login failed'
            }));

          case 10:
            _context5.next = 16;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](4);
            res.status(404).send(_context5.t0);
            console.log(_context5.t0);

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[4, 12]]);
  }));
  return _loginBygoogle.apply(this, arguments);
}

function createClientGoogle(_x11, _x12) {
  return _createClientGoogle.apply(this, arguments);
}

function _createClientGoogle() {
  _createClientGoogle = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body3, givenName, familyName, email, googleId, dateBaseByGoogle, newClient, client_id;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body3 = req.body, givenName = _req$body3.givenName, familyName = _req$body3.familyName, email = _req$body3.email, googleId = _req$body3.googleId;

            if (!(!givenName || !familyName || !email || !googleId)) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return", res.status(404).send('Faltan datos'));

          case 3:
            _context6.prev = 3;
            _context6.next = 6;
            return _Clientbygoogle["default"].findOne({
              where: {
                email: email
              }
            });

          case 6:
            dateBaseByGoogle = _context6.sent;

            if (dateBaseByGoogle) {
              _context6.next = 22;
              break;
            }

            console.log(googleId);
            _context6.next = 11;
            return _Clientbygoogle["default"].create({
              givenName: givenName,
              familyName: familyName,
              email: email,
              googleId: googleId
            });

          case 11:
            newClient = _context6.sent;

            if (!newClient) {
              _context6.next = 22;
              break;
            }

            _context6.next = 15;
            return _Clientbygoogle["default"].findOne({
              where: {
                givenName: newClient.givenName
              },
              attributes: ['googleId']
            });

          case 15:
            client_id = _context6.sent;
            console.log(client_id);
            _context6.next = 19;
            return _Cart["default"].create({
              id_clientGoogle: client_id.dataValues.googleId
            });

          case 19:
            _context6.next = 21;
            return _Favorite["default"].create({
              id_clientGoogle: client_id.dataValues.googleId
            });

          case 21:
            return _context6.abrupt("return", res.status(200).send({
              message: 'user by google create',
              data: newClient
            }));

          case 22:
            _context6.next = 27;
            break;

          case 24:
            _context6.prev = 24;
            _context6.t0 = _context6["catch"](3);
            console.error(_context6.t0);

          case 27:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 24]]);
  }));
  return _createClientGoogle.apply(this, arguments);
}