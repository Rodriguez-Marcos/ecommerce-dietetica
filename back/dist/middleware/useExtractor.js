"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var jwt = require('jsonwebtoken');

var _require = require('google-auth-library'),
    OAuth2Client = _require.OAuth2Client;

var CLIENT_ID = '908895428836-kaesjl71puimi31fjbffca9t4nvl7v6r.apps.googleusercontent.com';

function useExtractor(_x, _x2, _x3) {
  return _useExtractor.apply(this, arguments);
}

function _useExtractor() {
  _useExtractor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var _decodeToken;

    var authorization, token, decodeToken, _jwt$decode, verify, client;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            authorization = req.get('authorization');
            token = null;

            if (authorization && authorization.toLowerCase().startsWith('bearer')) {
              token = authorization.substring(7);
            }

            decodeToken = {};
            _context2.prev = 4;
            _context2.next = 7;
            return (_jwt$decode = jwt.decode(token)) === null || _jwt$decode === void 0 ? void 0 : _jwt$decode.iss;

          case 7:
            if (_context2.sent) {
              _context2.next = 11;
              break;
            }

            decodeToken = jwt.verify(token, 'secret');
            _context2.next = 14;
            break;

          case 11:
            verify = /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var ticket, payload, userid;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return client.verifyIdToken({
                          idToken: token,
                          audience: CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
                          // Or, if multiple clients access the backend:
                          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]

                        });

                      case 2:
                        ticket = _context.sent;
                        payload = ticket.getPayload();
                        userid = payload['sub']; // If request specified a G Suite domain:
                        // const domain = payload['hd'];

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function verify() {
                return _ref.apply(this, arguments);
              };
            }();

            client = new OAuth2Client(CLIENT_ID);
            verify()["catch"](console.error);

          case 14:
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](4);
            console.log(_context2.t0);

          case 19:
            if (!(!token || !((_decodeToken = decodeToken) !== null && _decodeToken !== void 0 && _decodeToken.id))) {
              _context2.next = 21;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              error: 'token invalido'
            }));

          case 21:
            req.id = decodeToken.id;
            next();

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 16]]);
  }));
  return _useExtractor.apply(this, arguments);
}

var _default = useExtractor;
exports["default"] = _default;