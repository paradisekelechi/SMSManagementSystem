export default (sequelize, DataTypes) => {
  const Messages = sequelize.define(
    'Messages',
    {
      body: {
        type: DataTypes.STRING,
        allowNull: true,
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

  Messages.associate = (models) => {
    Messages.belongsTo(models.Contacts, { as: 'sender' });
    Messages.belongsTo(models.Contacts, { as: 'receiver' });
  };

  return Messages;
};
