var express = require('express');
var router = express.Router();
const user = require('../db/models/user');
const {sequelize} = require('../config/database')
const { Sequelize } = require('sequelize');
const { catchAsync } = require('../Utils/catchAsync');
const {AppError} = require('../Utils/appError');
const { createUser } = require('../Utils/createUser');

router.get('/',(req,res,next) => {
    res.send('signup')
})
router.post('/',catchAsync(async(req,res,next)=>{
    let { username,password,firstname,lastname,email,indexUser} = req.body;
    if(!indexUser || indexUser < 0){
        const userObj = await createUser(firstname,lastname,email,username,password,"agent");
        if(userObj){
            res.status(200).json({
                "__success_msg__" : `user successfully created`,
                "data" : userObj
            })
        }else{
            
            throw new AppError("Unable to create user.",400);
        }
       
    }else{
        throw new AppError( "Unable to create user. Username exist",400)
    }
}))
module.exports = router;