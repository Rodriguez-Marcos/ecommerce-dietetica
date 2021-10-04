"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express'),
    Router = _require.Router;

var _require2 = require("../controllers/addReview"),
    addReview = _require2.addReview;

var router = Router();
router.post("/:id", addReview);
var _default = router;
exports["default"] = _default;