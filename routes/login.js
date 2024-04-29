require("dotenv").config();
var express = require("express");
var router = express.Router();
const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../config/database");
const { Sequelize } = require("sequelize");
const authtoken = require("../db/models/authtoken");
const { catchAsync } = require("../Utils/catchAsync");
const {AppError} = require("../Utils/appError");
const {generateToken} = require("../Middlware/authenticate");

//for middlware
const app = express();

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("login");
});

router.post(
  "/",
  catchAsync(async (req, res, next) => {
    let { username, password } = req.body;
    if(!username || !password){
      throw new AppError("Username / Password missing",401)
    }
    const USER = user(sequelize, Sequelize.DataTypes);
    const AUTH = authtoken(sequelize, Sequelize.DataTypes);
    const userObj = await USER.findOne({
      where: { username: username },
    });

    if (!userObj || userObj["password"] !== password) {
      throw new AppError("Unauthorised access,username / password wrong", 401);
    } else {
      const existingToken = await AUTH.findOne({
        where: { userID: userObj.id },
      });
      if (existingToken) {
        await AUTH.destroy({
          where: {
            id: existingToken.id,
          },
        });
      }
      let token = generateToken( { id: userObj["id"], username: userObj["username"] })
      await AUTH.create({
        token: token,
        expiry: process.env.JWT_EXPIRY,
        userID: userObj.id,
      });
      res.status(200).json({
        __successmsg__: "__login successful",
        token: `${token}`,
      });
    }
  })
);
module.exports = router;
