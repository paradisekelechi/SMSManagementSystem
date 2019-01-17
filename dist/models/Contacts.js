'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Contacts = sequelize.define('Contacts', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Contact name is required'
      },
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Contact phone is required'
      },
      unique: true
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

  Contacts.associate = function (models) {
    Contacts.hasMany(models.Messages, { foreignKey: 'id' });
  };

  return Contacts;
};