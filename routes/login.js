require('dotenv').config();
var express = require('express');
var router = express.Router();
const user = require('../db/models/user');
const jwt = require('jsonwebtoken');
const {sequelize} = require('../config/database')
const { Sequelize} = require('sequelize')


//for middlware
const app = express();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('login');
});

router.post('/',async(req,res,next)=>{
    let { username,password} = req.body;
    const USER = user(sequelize,Sequelize.DataTypes);
    const userObj = await USER.findOne({
        where: { username : username}
    })
    console.log(userObj['username'])
    if(!userObj || (userObj['password'] !== password)){
        res.status(401).json({
            "__err" : "Unauthorised access"
        })
    }else{
        let token = jwt.sign({ id: userObj['id'], username: userObj['username'] }, process.env.JWT_secret_key , { expiresIn: '1h' });
        res.status(200).json({
            "__successmsg__" : "__login successful",
            "token" : `${token}`
        })
    }
})
module.exports = router;
