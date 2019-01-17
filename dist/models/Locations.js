'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Locations = sequelize.define('Locations', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Location name is required'
      },
      unique: true
    },
    male: {
      type: DataTypes.INTEGER
    },
    female: {
      type: DataTypes.INTEGER
    },
    deleted: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    freezeTableName: true
  });

  Locations.associate = function (models) {
    Locations.belongsTo(models.Locations, { as: 'ParentLocationId' });
  };

  return Locations;
};