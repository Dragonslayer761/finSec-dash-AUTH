var express = require('express');
var router = express.Router();
const user = require('../Constant/userList');
const jwt = require('jsonwebtoken');
require('dotenv').config();
let auth = require('../Middlware/authenticate')

//for middlware
const app = express();

/* GET users listing. */
router.get('/',auth, (req, res, next) => {
  res.send('login');
});

router.post('/',(req,res,next)=>{
    let { username,password} = req.body;
    let loginSuccess = false;
    for(let i =0; i<user.length;i++){
        if(username === user[i].userName && password === user[i].passWord){
            loginSuccess = true;
            break;
        }
    }
    if(!loginSuccess){
        res.status(401).json({
            "__err" : "Unauthorised access"
        })
    }else{
        let token = jwt.sign({ id: "12312", username: username }, process.env.JWT_secret_key , { expiresIn: '1h' });
        res.status(200).json({
            "__successmsg__" : "__login successful",
            "token" : `Bearer ${token}`
        })
    }
})
module.exports = router;
