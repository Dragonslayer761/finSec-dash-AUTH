require('dotenv').config();
var express = require('express');
var router = express.Router();
const user = require('../db/models/user');
const jwt = require('jsonwebtoken');
const {sequelize} = require('../config/database')
const { Sequelize} = require('sequelize');
const authtoken = require('../db/models/authtoken');
const { catchAsync } = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');


//for middlware
const app = express();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('login');
});

router.post('/',catchAsync(async(req,res,next)=>{
    let { username,password} = req.body;
    const USER = user(sequelize,Sequelize.DataTypes);
    const AUTH = authtoken(sequelize,Sequelize.DataTypes);
    const userObj = await USER.findOne({
        where: { username : username}
    })
    console.log(userObj['username'])
    if(!userObj || (userObj['password'] !== password)){
        throw new AppError( "Unauthorised access",401)
    }else{
        let token = await jwt.sign({ id: userObj['id'], username: userObj['username'] }, process.env.JWT_secret_key , { expiresIn: process.env.JWT_EXPIRY });
        await AUTH.create({
            token : token,
            expiry : process.env.JWT_EXPIRY,
            userID : userObj.id
        })
        res.status(200).json({
            "__successmsg__" : "__login successful",
            "token" : `${token}`
        })
    }
}))
module.exports = router;
