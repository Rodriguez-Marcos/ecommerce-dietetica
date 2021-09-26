"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/diet'),
    createDiet = _require2.createDiet;

var router = Router();
router.post('/', createDiet);
var _default = router;
exports["default"] = _default;