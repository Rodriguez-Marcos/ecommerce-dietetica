"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/favorite'),
    addToFavorite = _require2.addToFavorite,
    getFavorite = _require2.getFavorite,
    removeFromFavorite = _require2.removeFromFavorite;

var router = Router();
router.post('/', addToFavorite);
router.get('/', getFavorite);
router["delete"]('/', removeFromFavorite);
var _default = router;
exports["default"] = _default;