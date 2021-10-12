"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginUser = loginUser;
exports["default"] = void 0;

var _Client = _interopRequireDefault(require("../models/Client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var loginRouter = require('express').Router();

var _require = require('google-auth-library'),
    OAuth2Client = _require.OAuth2Client;

var CLIENT_ID = '908895428836-kaesjl71puimi31fjbffca9t4nvl7v6r.apps.googleusercontent.com';

function loginUser(_x, _x2) {
  return _loginUser.apply(this, arguments);
} ///midleware xd


function _loginUser() {
  _loginUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, username, password, email, user, passwordCorrect, userForToken, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, password = _req$body.password;
            email = username;
            _context.next = 4;
            return _Client["default"].findOne({
              where: {
                email: email
              }
            });

          case 4:
            user = _context.sent;

            if (!(user === null)) {
              _context.next = 9;
              break;
            }

            _context.t0 = false;
            _context.next = 12;
            break;

          case 9:
            _context.next = 11;
            return bcrypt.compare(password, user.password);

          case 11:
            _context.t0 = _context.sent;

          case 12:
            passwordCorrect = _context.t0;

            if (user && passwordCorrect) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              error: 'invalid user or password'
            }));

          case 15:
            userForToken = {
              id: user.id,
              name: user.name,
              email: user.email
            };
            token = jwt.sign(userForToken, 'secret');
            res.send(token);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loginUser.apply(this, arguments);
}

function useExtractor(_x3, _x4, _x5) {
  return _useExtractor.apply(this, arguments);
}

function _useExtractor() {
  _useExtractor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var _jwt$decode, _decodeToken;

    var authorization, token, decodeToken, iss, verify, client;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            authorization = req.get('authorization');
            token = null;

            if (!(authorization && authorization.toLowerCase().startsWith('bearer'))) {
              _context3.next = 6;
              break;
            }

            token = authorization.substring(7);
            _context3.next = 7;
            break;

          case 6:
            throw new Error('El metodo de autenticacion tiene que ser Bearer');

          case 7:
            decodeToken = {};
            _context3.next = 10;
            return (_jwt$decode = jwt.decode(token)) === null || _jwt$decode === void 0 ? void 0 : _jwt$decode.iss;

          case 10:
            iss = _context3.sent;
            _context3.prev = 11;

            if (iss) {
              _context3.next = 16;
              break;
            }

            decodeToken = jwt.verify(token, 'secret');
            _context3.next = 20;
            break;

          case 16:
            verify = /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var ticket, payload, userid, user, _ticket$payload$name$, _ticket$payload$name$2, name, lastname;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return client.verifyIdToken({
                          idToken: token,
                          audience: CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
                          // Or, if multiple clients access the backend:
                          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]

                        });

                      case 2:
                        ticket = _context2.sent;
                        payload = ticket.getPayload();
                        userid = payload['sub']; // If request specified a G Suite domain:
                        // const domain = payload['hd'];

                        _context2.next = 7;
                        return _Client["default"].findOne({
                          where: {
                            email: ticket.payload.email
                          }
                        });

                      case 7:
                        user = _context2.sent;

                        if (!(user !== null && user !== void 0 && user.password)) {
                          _context2.next = 10;
                          break;
                        }

                        throw new Error('Se encontro un usuario ya registrado con ese email');

                      case 10:
                        req.id = user === null || user === void 0 ? void 0 : user.id;
                        req.email = ticket.payload.email;
                        _ticket$payload$name$ = ticket.payload.name.split(' '), _ticket$payload$name$2 = _slicedToArray(_ticket$payload$name$, 2), name = _ticket$payload$name$2[0], lastname = _ticket$payload$name$2[1];
                        req.name = name;
                        req.lastname = lastname ? lastname : 'no lastname';

                      case 15:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function verify() {
                return _ref.apply(this, arguments);
              };
            }();

            client = new OAuth2Client(CLIENT_ID);
            _context3.next = 20;
            return verify();

          case 20:
            _context3.next = 26;
            break;

          case 22:
            _context3.prev = 22;
            _context3.t0 = _context3["catch"](11);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(409).json({
              error: _context3.t0
            }));

          case 26:
            if (!(!token || !((_decodeToken = decodeToken) !== null && _decodeToken !== void 0 && _decodeToken.id))) {
              _context3.next = 29;
              break;
            }

            if (iss) {
              _context3.next = 29;
              break;
            }

            return _context3.abrupt("return", res.status(401).json({
              error: 'token invalido'
            }));

          case 29:
            if (!req.id) req.id = decodeToken.id;
            if (!req.email) req.email = decodeToken.email;
            next();

          case 32:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[11, 22]]);
  }));
  return _useExtractor.apply(this, arguments);
}

var _default = useExtractor;
exports["default"] = _default;