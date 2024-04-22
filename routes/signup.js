var express = require('express');
var router = express.Router();
// let user = require('../Constant/userList');
const {checkUser} = require('../Middlware/checkuser');
const user = require('../db/models/user');
const {sequelize} = require('../config/database')
const { Sequelize } = require('sequelize')

router.get('/',(req,res,next) => {
    res.send('signup')
})
router.post('/',checkUser,async(req,res,next)=>{
    let { username,password,firstname,lastname,email,indexUser} = req.body;
    if(!indexUser || indexUser < 0){
        const USER = user(sequelize,Sequelize.DataTypes);
        const userObj = await USER.create({
            username : username,
            password : password,
            firstname : firstname,
            lastname : lastname,
            email : email,
            role: "agent"
    })
        if(userObj){
            res.status(200).json({
                "__success_msg__" : `user successfully created`,
                "data" : userObj
            })
        }else{
            res.status(400).json({
                "_err" : "Unable to create user."
            })
        }
       
    }else{
        res.status(400).json({
            "_err" : "Unable to create user. Username exist"
        })
    }
})
module.exports = router;