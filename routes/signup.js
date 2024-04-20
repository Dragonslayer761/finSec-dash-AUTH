var express = require('express');
var router = express.Router();
// let user = require('../Constant/userList');
const {checkUser} = require('../Middlware/checkuser');
const user = require('../db/models/user');

router.get('/',(req,res,next) => {
    res.send('signup')
})
router.post('/',checkUser,(req,res,next)=>{
   
    let { username,password,name,email,indexUser} = req.body;
    if(!indexUser || indexUser < 0){
        // user.push({
        //     userName : username,
        //     passWord : password,
        //     name : name,
        //     email : email
        // })
        const user = user.create({
                username : username,
                password : password,
                firstname : name,
                email : email,
                usertype: "agent"
        })
        
        res.status(200).json({
            "__success_msg__" : `${username}'s account created`
        })
    }else{
        res.status(400).json({
            "_err" : "Unable to create user. Username exist"
        })
    }
})
module.exports = router;