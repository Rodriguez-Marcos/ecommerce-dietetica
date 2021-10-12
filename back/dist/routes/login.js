"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _loginUser = require("../controllers/loginUser");

var _require = require('express'),
    Router = _require.Router;

var router = Router();
router.post('/', _loginUser.loginUser);
var _default = router;
exports["default"] = _default;