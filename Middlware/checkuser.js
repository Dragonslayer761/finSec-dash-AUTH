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
    if(userExist){
        next();
    }else{
        res.status(404).json({
            _error_ : `${username} username not found`
        })
    }
}

module.exports = {checkUser};