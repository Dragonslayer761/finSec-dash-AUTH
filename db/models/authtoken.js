'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AuthToken.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    token: {
      allowNull:false,
      type: DataTypes.STRING,
      validate : {
        notNull : {
          msg : `token cannot be null`
        },
        notEmpty : {
          msg : `toekn cannot be empty`
        }
      }
    },
    expiry: {
      allowNull:false,
      type: DataTypes.STRING,
      validate : {
        notNull : {
          msg : `expiry cannot be null`
        },
        notEmpty : {
          msg : `expiry cannot be empty`
        }
      }
    },
    userID:{
      type : DataTypes.INTEGER,
      allowNull :false,
      references : {
        model : "user",
        key : "id"
      },
      validate : {
        notNull : {
          msg : `userID cannot be null`
        },
        notEmpty : {
          msg : `userID cannot be empty`
        }
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    freezeTableName : true,
    modelName: 'AuthToken',
  });
  return AuthToken;
};