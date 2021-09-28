"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/category'),
    createCategory = _require2.createCategory,
    getCategories = _require2.getCategories,
    deleteCategory = _require2.deleteCategory;

var router = Router();
router.post('/', createCategory);
router.get('/', getCategories);
router["delete"]('/:id', deleteCategory);
var _default = router;
exports["default"] = _default;