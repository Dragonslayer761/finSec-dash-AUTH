'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AuthToken', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: {
        allowNull:false,
        type: Sequelize.STRING
      },
      expiry: {
        allowNull:false,
        type: Sequelize.STRING
      },
      userID:{
        type : Sequelize.INTEGER,
        allowNull :false,
        references : {
          model : "user",
          key : "id"
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
    });
  },
  async down(queryInterface, Sequelize) {
  //  const transaction = queryInterface.sequelizeggg.transaction;
  //  try{
  //   queryInterface.removeConstraint(
  //     'AuthToken',
  //     "AuthToken_userID_fkey",
  //     {transaction}
  //   );
  //   queryInterface.dropTable('AuthToken',{transaction});
  //   return transaction.commit();
  //  }catch(error){
  //   await transaction.rollback();
  //   return error;
  //  }
    await queryInterface.dropTable('AuthToken');
  }
};