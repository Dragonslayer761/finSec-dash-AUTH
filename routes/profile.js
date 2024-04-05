var express = require('express');
var router = express.Router();
let user = require('../Constant/userList');
const authenticate = require('../Middlware/authenticate');

router.get('/',authenticate,(req,res,next) => {
    res.json({
        settings : ['Display picture','Account settings','Privacy settings']
    });
})

router.post('/',authenticate,(req,res,next)=>{
    
})

module.exports = router;