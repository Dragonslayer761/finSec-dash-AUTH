var express = require('express');
var router = express.Router();
let user = require('../Constant/userList');

router.get('/',(req,res,next) => {
    res.send('signup')
})
router.post('/',(req,res,next)=>{
   
    let { username,password,name,email} = req.body;
    let userExist = false;
    for(let i =0; i<user.length;i++){
        if(username === user[i].userName){
            userExist = true;
            break;
        }
    }
    if(!userExist){
        console.log("enter user to the db");
        user.push({
            userName : username,
            passWord : password,
            name : name,
            email : email
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