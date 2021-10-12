"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _product = _interopRequireDefault(require("./routes/product.js"));

var _client = _interopRequireDefault(require("./routes/client.js"));

var _order = _interopRequireDefault(require("./routes/order.js"));

var _category = _interopRequireDefault(require("./routes/category.js"));

var _diet = _interopRequireDefault(require("./routes/diet.js"));

var _login = _interopRequireDefault(require("./routes/login.js"));

var _cart = _interopRequireDefault(require("./routes/cart.js"));

var _review = _interopRequireDefault(require("./routes/review.js"));

var _favorite = _interopRequireDefault(require("./routes/favorite.js"));

var _loginUser = _interopRequireDefault(require("./controllers/loginUser.js"));

var _payment = _interopRequireDefault(require("./routes/payment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var cors = require('cors'); //Importing routes 


var app = (0, _express["default"])();
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from

  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use((0, _express.json)()); //entiende archivos en formato json

app.use((0, _morgan["default"])('dev')); // muestra por consola lo que va llegando

app.use('/products', _product["default"]);
app.use('/clients', _client["default"]);
app.use('/categories', _category["default"]);
app.use('/diets', _diet["default"]);
app.use('/login', _login["default"]);
app.use('/addCart', _cart["default"]);
app.use('/orders', _loginUser["default"], _order["default"]);
app.use('/reviews', _loginUser["default"], _review["default"]);
app.use('/favorite', _loginUser["default"], _favorite["default"]);
app.use('/cart', _loginUser["default"], _cart["default"]);
app.use('/payment', _loginUser["default"], _payment["default"]);
app.get("/feedback", function (req, res) {
  console.log(req.query.payment_id);
  console.log(req.query.collection_status);

  if (req.query.collection_status === 'approved') {
    return res.redirect("http://localhost:3000/payment/success");
  }

  if (req.query.collection_status === 'pending') {
    return res.redirect("http://localhost:3000/payment/pending");
  }

  return res.redirect("http://localhost:3000/payment/failure");
});
var _default = app;
exports["default"] = _default;