"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/favorite'),
    createFavorite = _require2.createFavorite,
    getFavorites = _require2.getFavorites;

var router = Router();
router.post('/id_client', createFavorite);
router.get('/', getFavorites);
var _default = router;
exports["default"] = _default;