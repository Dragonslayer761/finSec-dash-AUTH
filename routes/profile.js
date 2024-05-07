var express = require('express');
var router = express.Router();
let user = require('../db/models/user');
const {authenticate} = require('../Middlware/authenticate');
const { sequelize } = require('../config/database');
const { Sequelize } = require('sequelize');
const { catchAsync } = require('../Utils/catchAsync');

router.get('/',authenticate,catchAsync(async(req,res,next) => {
    const {userDetails} = req.body;
    const USER = user(sequelize, Sequelize.DataTypes);
    const userOBJ = await USER.findOne({
        where : {
            id : userDetails.id
        }
    })
    res.json({
        settings : ['Display picture','Account settings','Privacy settings'],
        user :userOBJ
    });
}))

router.post('/',authenticate,(req,res,next)=>{
    
})

module.exports = router;