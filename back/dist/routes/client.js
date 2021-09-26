"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/client'),
    createClient = _require2.createClient;

var router = Router();
router.post('/', createClient);
var _default = router;
exports["default"] = _default;