'use strict';
module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    cases: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Cases cannot be empty'
        },
        isInt: {
          args: true,
          msg: 'Cases must be a number'
        },
        min: {
          args: 1,
          msg: 'Cases must be greater than zero'
        }
      }
    },
    CountryId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Report.associate = function(models) {
    // associations can be defined here
    Report.belongsTo(models.Country);
    Report.belongsTo(models.User);
  };
  return Report;
};