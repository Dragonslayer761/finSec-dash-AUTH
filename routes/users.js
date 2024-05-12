var express = require("express");
var router = express.Router();
const { authenticate } = require("../Middlware/authenticate");
const { catchAsync } = require("../Utils/catchAsync");
const user = require("../db/models/user");
const { sequelize } = require("../config/database");
const { Sequelize } = require("sequelize");
const { createUser } = require("../Utils/createUser");
const { AppError } = require("../Utils/appError");

const USER = user(sequelize, Sequelize.DataTypes);
/* GET users listing. */
router.get("/", authenticate, function (req, res, next) {
  res.send("respond with a resource");
});

//get user by roles
// router.get(
//   "/:role",
//   authenticate,
//   catchAsync(async (req, res, next) => {
//     const { role } = req.params;
//     const users = await USER.findAll({
//       where: {
//         role: role,
//       },
//     });
//   })

// );
//api for get all customer
router.get(
  "/customer",
  authenticate,
  catchAsync(async (req, res, next) => {
    const customer = await USER.findAll({
      attributes: ['firstname', 'lastname','username','email'],
      where: {
        role: "user",
      },
    });
    if(customer){
      res.status(200).json(customer);
    }else{
      throw new AppError("unable to get the customer",404);
    }
    
  })
);
//api to add new customer
router.post(
  "/customer/add",authenticate,
  catchAsync(async (req, res, next) => {
    const { username, email, firstname, lastname,password } = req.body;
    const usersList = await USER.findAll({
      where : {
        username :username
      }
    })
    if(usersList.length <= 0){
      const userObj = await createUser(
        firstname,
        lastname,
        email,
        username,
        password,
        "user"
      );
      if (userObj) {
        res.status(200).json({
          __success_msg__: `user successfully created`,
          setPassword: true,
        });
      }else{
        throw new AppError("Uanble to create new customer",400)
      }
    }else{
      throw new AppError("username already exist",409);
    }
  })
);
//api for getting specific customer
// router.get(
//   "/customer/:id",
//   authenticate,
//   catchAsync(async (req, res, next) => {
//     const { id } = req.params;
//     const customerObj = await USER.findOne({
//       where: {
//         role: "user",
//         id: id,
//       },
//     });
//   })
// );

module.exports = router;
