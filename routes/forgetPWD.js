var express = require('express');
var router = express.Router();
const user = require('../Constant/userList');
let checkuser =  require('../Middlware/checkuser')

const app = express();

router.get('/',(req,res,next) => {

})

router.post('/sendusername',checkuser,(req,res,next)=>{
    const {username,indexUser} = req.body;
   
    if(indexUser <= 0){
        res.status(202).json({
            userExist : `${username} exist`,
            changePassword : true
        })
    }else{
        res.status(404).json(
            {
                userExist : `${username} don't exist`,
                changePassword : false
            }
        )
    }
})

router.post('/passwordchange',checkuser,(req,res,next) => {
    const {username,password,indexUser} = req.body;
    user[indexUser].passWord = password;
    console.log(user);
    res.status(202).json({
        _success_ : "password changed successfully",
        _username_ : username
    })
})
module.exports = router;