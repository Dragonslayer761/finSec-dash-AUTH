'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull : false
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull : false
      },
      email: {
        type: Sequelize.STRING,
        allowNull : false
      },
      username: {
        type: Sequelize.STRING,
        unique : true,
        allowNull : false
      },
      password: {
        type: Sequelize.STRING,
        allowNull : false
      },
      role: {
        type: Sequelize.ENUM("admin","agent","user"),
        allowNull : false,
        defaultValue : "agent"
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
    await queryInterface.dropTable('user');
  }
};