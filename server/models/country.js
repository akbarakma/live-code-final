'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Country extends Model {}
  Country.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Name cannot be empty'
          }
        }
      },
      cases: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Cases cannot be empty'
          }
        }
      },
      deaths: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Deaths cannot be empty'
          }
        }
      },
      recovered: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Name cannot be empty'
          }
        }
      }
    },
    {
      sequelize
    }
  );
  Country.associate = function(models) {
    // associations can be defined here
    Country.hasMany(models.Report);
  };
  return Country;
};
