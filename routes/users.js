var express = require("express");
var router = express.Router();
const { authenticate } = require("../Middlware/authenticate");
const { catchAsync } = require("../Utils/catchAsync");
const user = require("../db/models/user");
const { sequelize } = require("../config/database");
const { Sequelize } = require("sequelize");
const { createUser } = require("../Utils/createUser");

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
      where: {
        role: "user",
      },
    });
    console.log(customer)
    res.status(200).json(customer);
  })
);
//api to add new customer
router.post('/customer/add',catchAsync(async(req,res,next) => {
  const {username,password,email,firstname,lastname} = req.body;
  const userObj = await createUser(firstname,lastname,email,username,password,"user");
}))
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
