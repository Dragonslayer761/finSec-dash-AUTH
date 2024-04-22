const user = require('../Constant/userList')

function checkUser(req,res,next){
    const {username}  = req.body;
    let userExist = false;
    user.forEach((data,index) =>{
        if(data.userName === username){
            req.body['indexUser'] = index;
            userExist = true
        }
    })
    req.body['userExist'] = userExist;
    next();
}

module.exports = {checkUser};