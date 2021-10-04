"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/client'),
    createClient = _require2.createClient,
    createClientGoogle = _require2.createClientGoogle,
    getClients = _require2.getClients,
    deleteClient = _require2.deleteClient,

    loginUser = _require2.loginUser,
    loginBygoogle = _require2.loginBygoogle;


var router = Router();
router.post('/', createClient);
router.post('/bygoogle', createClientGoogle);
router.get('', loginUser);
router.get('/loginbygoogle', loginBygoogle);
router.get('/', getClients);
router["delete"]('/:id', deleteClient);
var _default = router;
exports["default"] = _default;