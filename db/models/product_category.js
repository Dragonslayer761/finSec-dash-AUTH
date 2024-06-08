'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_category.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    product_name: {
      allowNull:false,
      type: Sequelize.STRING,
      validate : {
        notNull : {
          msg : "Product name cannot be null"
        },
        notEmpty : {
          msg : "Prodcut name cannot be empty"
        }
      }
    },
    product_description : {
      type : Sequelize.STRING
    },
    product_icon : {
      allowNull:false,
      type : Sequelize.STRING,
      validate : {
         notNull : {
          msg : "Icon cannot be empty"
         },
         notEmpty : {
           msg : "Icon cannot be empty"
         }
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    sequelize,
    modelName: 'product_category',
    freezeTableName : true
  });
  return product_category;
};