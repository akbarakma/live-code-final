'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Countries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Name cannot be empty'
          }
        }
      },
      deaths: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Deaths cannot be empty'
          }
        }
      },
      recovered: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Name cannot be empty'
          }
        }
      },
      cases: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Cases cannot be empty'
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Countries');
  }
};
