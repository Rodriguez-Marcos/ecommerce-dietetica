"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createClient = createClient;
exports.getClients = getClients;
exports.deleteClient = deleteClient;
exports.createClientGoogle = createClientGoogle;

var _Client = _interopRequireDefault(require("../models/Client.js"));

var _Clientbygoogle = _interopRequireDefault(require("../models/Clientbygoogle.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bcrypt = require('bcrypt');

function createClient(_x, _x2) {
  return _createClient.apply(this, arguments);
}

function _createClient() {
  _createClient = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, lastname, email, password, address, phone, newClient;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, lastname = _req$body.lastname, email = _req$body.email, password = _req$body.password, address = _req$body.address, phone = _req$body.phone;
            _context.next = 3;
            return bcrypt.hash(password, 10);

          case 3:
            password = _context.sent;
            _context.prev = 4;
            _context.next = 7;
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

          case 7:
            newClient = _context.sent;

            if (!newClient) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.json({
              message: 'Client created successfully',
              data: newClient
            }));

          case 10:
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](4);
            console.log(_context.t0);
            res.status(500).json({
              message: 'Something goes Wrong',
              data: {}
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 12]]);
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

function createClientGoogle(_x7, _x8) {
  return _createClientGoogle.apply(this, arguments);
}

function _createClientGoogle() {
  _createClientGoogle = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body2, givenName, familyName, email, googleId, clientbygoogle;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, givenName = _req$body2.givenName, familyName = _req$body2.familyName, email = _req$body2.email, googleId = _req$body2.googleId;
            _context4.next = 3;
            return bcrypt.hash(googleId, 10);

          case 3:
            googleId = _context4.sent;

            if (!(!givenName || !familyName || !email || !googleId)) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(404).send('Faltan datos'));

          case 6:
            _context4.prev = 6;
            console.log(googleId);
            _context4.next = 10;
            return _Clientbygoogle["default"].create({
              givenName: givenName,
              familyName: familyName,
              email: email,
              googleId: googleId
            });

          case 10:
            clientbygoogle = _context4.sent;
            res.status(200).send({
              message: 'user by google create',
              data: clientbygoogle
            });
            _context4.next = 17;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](6);
            console.error(_context4.t0);

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[6, 14]]);
  }));
  return _createClientGoogle.apply(this, arguments);
}