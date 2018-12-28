export default (sequelize, DataTypes) => {
  const Locations = sequelize.define(
    'Locations',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Location name is required',
        },
      },
      male: {
        type: DataTypes.INTEGER,
        notNull: true,
      },
      female: {
        type: DataTypes.INTEGER,
        notNull: true,
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

  return Locations;
};
