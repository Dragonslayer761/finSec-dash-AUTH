var express = require('express');
const user = require('../db/models/user');
const { sequelize } = require('../config/database');
const { Sequelize } = require('sequelize');
const { catchAsync } = require('../Utils/catchAsync');
const { AppError } = require('../Utils/appError');
var router = express.Router();

const app = express();
const USER = user(sequelize,Sequelize.DataTypes);

router.get('/',(req,res,next) => {

})

router.post('/sendusername',catchAsync(async (req,res,next)=>{
    
    const {username} = req.body;
    const userObj = await USER.findOne({
        where : {
            username : username
        }
    })
    if(userObj){
        res.status(202).json({
            changePassword : true
        })
    }else{
        res.status(401).json(
            {
                changePassword : false
            }
        )
    }
}))

router.post('/passwordchange',catchAsync(async(req,res,next) => {
    const {username,password} = req.body;
    if(username === undefined || username === null || username === ""){
        throw new AppError("username empty,password canot be changed",500);
    }
    const userObj = await USER.findOne({
        where : {
            username : username
        }
    })
    if(userObj){
        const updateSuccess = await USER.update(
            {password : password},
            {
                where : {
                    id : userObj.id
                }
            }
        )
        if(updateSuccess){
            res.status(202).json({
                _success_ : "password changed successfully",
                _username_ : username
            })
        }else{
            new AppError('password change failed',500);
        }
    }
    
}))
module.exports = router;