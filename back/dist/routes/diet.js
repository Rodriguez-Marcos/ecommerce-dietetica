"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/diet'),
    createDiet = _require2.createDiet,
    getDiets = _require2.getDiets,
    deleteDiet = _require2.deleteDiet;

var router = Router();
router.post('/', createDiet);
router.get('/', getDiets);
router["delete"]('/:id', deleteDiet);
var _default = router;
exports["default"] = _default;