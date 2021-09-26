"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/category'),
    createCategory = _require2.createCategory;

var router = Router();
router.post('/', createCategory);
var _default = router;
exports["default"] = _default;