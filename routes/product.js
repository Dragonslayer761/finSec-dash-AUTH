var express = require("express");
var router = express.Router();
let {authenticate} = require("../Middlware/authenticate");
const { catchAsync } = require("../Utils/catchAsync");
const productCategory = require("../db/models/product_category");
const { sequelize } = require("../config/database");
const { Sequelize } = require("sequelize");
const { AppError } = require("../Utils/appError");
const PRODUCTCATEGORY = productCategory(sequelize, Sequelize.DataTypes);

router.get(
  "/category",
  authenticate,
  catchAsync(async (req, res, next) => {
    const allProduct = await PRODUCTCATEGORY.findAll({
      attributes: ["id","product_name", "product_description", "product_icon"],
    });
    if (allProduct) {
      res.status(200).json(allProduct);
    } else {
      throw new AppError("unable to get product type", 404);
    }
  })
);

router.post(
  "/category",
  authenticate,
  catchAsync(async (req, res, next) => {
    const { product_name, product_description, product_icon } = req.body;
    let result = await PRODUCTCATEGORY.create({
      product_name: product_name,
      product_description: product_description,
      product_icon: product_icon,
    });
    if (result) {
      res.status(202).json({
        __successmsg__: "product category added",
      });
    } else {
      throw new AppError("unable to add product category", 404);
    }
  })
);
module.exports = router;
