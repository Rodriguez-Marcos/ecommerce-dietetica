"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _loginUser = _interopRequireDefault(require("../controllers/loginUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/client'),
    createClient = _require2.createClient,
    getClients = _require2.getClients,
    deleteClient = _require2.deleteClient,
    loginUser = _require2.loginUser,
    updateClientToAdmin = _require2.updateClientToAdmin,
    RegOrCreateGaccount = _require2.RegOrCreateGaccount,
    resetPassword = _require2.resetPassword;

var router = Router();
router.post('/', createClient);
router.post('/bygoogle', _loginUser["default"], RegOrCreateGaccount);
router.get('/login', loginUser);
router.get('/', getClients);
router["delete"]('/:id', deleteClient);
router.put('/:id', updateClientToAdmin);
router.put('/resetpassword/:id', resetPassword);
var _default = router;
exports["default"] = _default;