var express = require('express');
var router = express.Router();
let user = require('../Constant/userList');
const {authenticate} = require('../Middlware/authenticate');

router.get('/',authenticate,(req,res,next) => {
    res.send('this is dashboard section')
})

router.post('/',authenticate,(req,res,next)=>{
    
})

module.exports = router;