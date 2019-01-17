export default (sequelize, DataTypes) => {
  const Contacts = sequelize.define(
    'Contacts',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Contact name is required',
        },
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Contact phone is required',
        },
        unique: true,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      freezeTableName: true,
    },
  );

  Contacts.associate = (models) => {
    Contacts.hasMany(models.Messages, { foreignKey: 'id' });
  };

  return Contacts;
};
