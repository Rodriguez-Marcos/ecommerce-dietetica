"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express'),
    Router = _require.Router;

var _require2 = require("../controllers/addReview"),
    addReview = _require2.addReview,
    getReview = _require2.getReview;

var router = Router();
router.post("/:id", addReview);
router.get("/:id", getReview);
var _default = router;
exports["default"] = _default;