"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createClient = createClient;
exports.getClients = getClients;
exports.deleteClient = deleteClient;
exports.updateClientToAdmin = updateClientToAdmin;
exports.loginUser = loginUser;
exports.RegOrCreateGaccount = RegOrCreateGaccount;
exports.resetPassword = resetPassword;

var _Client = _interopRequireDefault(require("../models/Client.js"));

var _Cart = _interopRequireDefault(require("../models/Cart.js"));

var _Favorite = _interopRequireDefault(require("../models/Favorite.js"));

var _Product = _interopRequireDefault(require("../models/Product.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

module["export"] = _Client["default"];

function createClient(_x, _x2) {
  return _createClient.apply(this, arguments);
}

function _createClient() {
  _createClient = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, lastname, email, password, address, phone, dataBaseClient, newClient, client_id;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, lastname = _req$body.lastname, email = _req$body.email, password = _req$body.password, address = _req$body.address, phone = _req$body.phone;

            if (!(!name || !lastname || !email || !password || !address || !phone)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              error: 'faltan algunos campos'
            }));

          case 3:
            _context.next = 5;
            return bcrypt.hash(password, 10);

          case 5:
            password = _context.sent;
            _context.next = 8;
            return _Client["default"].findOne({
              where: {
                email: email
              }
            });

          case 8:
            dataBaseClient = _context.sent;
            _context.prev = 9;

            if (dataBaseClient) {
              _context.next = 25;
              break;
            }

            _context.next = 13;
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

          case 13:
            newClient = _context.sent;

            if (!newClient) {
              _context.next = 23;
              break;
            }

            _context.next = 17;
            return _Client["default"].findOne({
              where: {
                email: newClient.email
              },
              attributes: ['id']
            });

          case 17:
            client_id = _context.sent;
            _context.next = 20;
            return _Cart["default"].create({
              id_client: client_id.dataValues.id
            });

          case 20:
            _context.next = 22;
            return _Favorite["default"].create({
              id_client: client_id.dataValues.id
            });

          case 22:
            return _context.abrupt("return", res.json({
              message: 'Client created successfully',
              data: newClient,
              token: token
            }));

          case 23:
            _context.next = 26;
            break;

          case 25:
            return _context.abrupt("return", res.json({
              message: 'Usuario ya creado'
            }));

          case 26:
            _context.next = 32;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](9);
            console.log(_context.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 28]]);
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
    var id, clients;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _Cart["default"].destroy({
              where: {
                id_client: id
              }
            });

          case 4:
            _context3.next = 6;
            return _Favorite["default"].destroy({
              where: {
                id_client: id
              },
              include: [{
                model: _Product["default"]
              }]
            });

          case 6:
            _context3.next = 8;
            return _Client["default"].destroy({
              where: {
                id: id
              }
            });

          case 8:
            _context3.next = 10;
            return _Client["default"].findAll();

          case 10:
            clients = _context3.sent;
            return _context3.abrupt("return", res.json({
              message: 'Client deleted successfully',
              data: clients
            }));

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](1);
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
    }, _callee3, null, [[1, 14]]);
  }));
  return _deleteClient.apply(this, arguments);
}

function updateClientToAdmin(_x7, _x8) {
  return _updateClientToAdmin.apply(this, arguments);
}

function _updateClientToAdmin() {
  _updateClientToAdmin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, isAdmin, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _Client["default"].findOne({
              where: {
                id: id
              },
              attribute: ["isAdmin"]
            });

          case 4:
            isAdmin = _context4.sent;

            if (!(isAdmin.dataValues.isAdmin === false)) {
              _context4.next = 10;
              break;
            }

            _context4.next = 8;
            return _Client["default"].update({
              isAdmin: true
            }, {
              where: {
                id: id
              }
            });

          case 8:
            _context4.next = 12;
            break;

          case 10:
            _context4.next = 12;
            return _Client["default"].update({
              isAdmin: false
            }, {
              where: {
                id: id
              }
            });

          case 12:
            _context4.next = 14;
            return _Client["default"].findOne({
              where: {
                id: id
              }
            });

          case 14:
            user = _context4.sent;
            return _context4.abrupt("return", res.json({
              message: 'Client deleted successfully',
              data: user
            }));

          case 18:
            _context4.prev = 18;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 18]]);
  }));
  return _updateClientToAdmin.apply(this, arguments);
}

function loginUser(_x9, _x10) {
  return _loginUser.apply(this, arguments);
}

function _loginUser() {
  _loginUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body2, email, password, googleId, dataBaseByClient, _token, id, userToken, dataBaseByGoogle;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, googleId = _req$body2.googleId;

            if (googleId) {
              _context5.next = 26;
              break;
            }

            _context5.next = 4;
            return _Client["default"].findOne({
              where: {
                email: email
              }
            });

          case 4:
            dataBaseByClient = _context5.sent;
            _context5.next = 7;
            return bcrypt.compare(password, dataBaseByClient.password);

          case 7:
            password = _context5.sent;
            _context5.prev = 8;

            if (!password) {
              _context5.next = 17;
              break;
            }

            _token = '';
            id = dataBaseByClient.id;
            userToken = {
              id: id,
              email: email
            };
            _token = jwt.sign(userToken, 'juanelmascapo');
            return _context5.abrupt("return", res.json({
              message: 'User Login',
              data: dataBaseByClient,
              token: _token
            }));

          case 17:
            return _context5.abrupt("return", res.json({
              message: 'User Login failed'
            }));

          case 18:
            _context5.next = 24;
            break;

          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](8);
            res.status(404).send(_context5.t0);
            console.log(_context5.t0);

          case 24:
            _context5.next = 41;
            break;

          case 26:
            _context5.next = 28;
            return _Client["default"].findOne({
              where: {
                email: email,
                googleId: googleId
              }
            });

          case 28:
            dataBaseByGoogle = _context5.sent;
            _context5.prev = 29;

            if (!dataBaseByGoogle) {
              _context5.next = 34;
              break;
            }

            return _context5.abrupt("return", res.json({
              message: 'User Login',
              data: dataBaseByGoogle
            }));

          case 34:
            return _context5.abrupt("return", res.json({
              message: 'User Login failed'
            }));

          case 35:
            _context5.next = 41;
            break;

          case 37:
            _context5.prev = 37;
            _context5.t1 = _context5["catch"](29);
            res.status(404).send(_context5.t1);
            console.log(_context5.t1);

          case 41:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[8, 20], [29, 37]]);
  }));
  return _loginUser.apply(this, arguments);
}

function RegOrCreateGaccount(_x11, _x12) {
  return _RegOrCreateGaccount.apply(this, arguments);
}

function _RegOrCreateGaccount() {
  _RegOrCreateGaccount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var client, newClient, client_id;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _Client["default"].findOne({
              where: {
                googleId: req.params.googleId
              }
            });

          case 2:
            client = _context6.sent;
            _context6.prev = 3;

            if (client) {
              _context6.next = 19;
              break;
            }

            _context6.next = 7;
            return _Client["default"].create({
              where: {
                email: req.email,
                isGoogleClient: true,
                googleId: req.body.googleId,
                name: req.name,
                lastname: req.lastname
              }
            });

          case 7:
            newClient = _context6.sent;

            if (!newClient) {
              _context6.next = 17;
              break;
            }

            _context6.next = 11;
            return _Client["default"].findOne({
              where: {
                email: req.email
              },
              attributes: ['id']
            });

          case 11:
            client_id = _context6.sent;
            _context6.next = 14;
            return _Cart["default"].create({
              id_client: client_id.dataValues.id
            });

          case 14:
            _context6.next = 16;
            return _Favorite["default"].create({
              id_client: client_id.dataValues.id
            });

          case 16:
            return _context6.abrupt("return", res.json({
              message: 'Client created successfully'
            }));

          case 17:
            _context6.next = 20;
            break;

          case 19:
            return _context6.abrupt("return", res.json({
              message: 'Usuario ya creado'
            }));

          case 20:
            _context6.next = 26;
            break;

          case 22:
            _context6.prev = 22;
            _context6.t0 = _context6["catch"](3);
            console.log(_context6.t0);
            return _context6.abrupt("return", res.status(507).json({
              err: _context6.t0
            }));

          case 26:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 22]]);
  }));
  return _RegOrCreateGaccount.apply(this, arguments);
}

function resetPassword(_x13, _x14) {
  return _resetPassword.apply(this, arguments);
}

function _resetPassword() {
  _resetPassword = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var id;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.prev = 1;
            _context7.next = 4;
            return _Client["default"].update({
              password: "12345"
            }, {
              where: {
                id: id
              }
            });

          case 4:
            _context7.next = 10;
            break;

          case 6:
            _context7.prev = 6;
            _context7.t0 = _context7["catch"](1);
            console.log(_context7.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 6]]);
  }));
  return _resetPassword.apply(this, arguments);
}