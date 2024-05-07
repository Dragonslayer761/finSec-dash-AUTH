const { Sequelize } = require("sequelize")
const { sequelize } = require("../config/database")
const user = require("../db/models/user")

const createUser = async (firstname,lastname,email,username,password,role) => {
    const USER = user(sequelize,Sequelize.DataTypes);
    const userObj = await USER.create({
        username : username,
        password : password,
        firstname : firstname,
        lastname : lastname,
        email : email,
        role: role
    })
    return userObj;
}
module.exports = {createUser};