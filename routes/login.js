var express = require('express');
var router = express.Router();
const user = [
    {
      userName : "subc",
      passWord : "123123"
    },
    {
      userName : "abhs",
      passWord : "123123"
    }
  ]
/* GET users listing. */
router.get('/', function(req, res, next) {
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
        res.status(200).json({
            "__successmsg__" : "__login successful",
            "token" : `_login_token_${username}`
        })
    }
})
module.exports = router;
