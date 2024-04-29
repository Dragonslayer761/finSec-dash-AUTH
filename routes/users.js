var express = require('express');
var router = express.Router();
let user = require('../Constant/userList');
const {authenticate} = require('../Middlware/authenticate');
/* GET users listing. */
router.get('/',authenticate, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
