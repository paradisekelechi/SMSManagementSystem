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
      },
      female: {
        type: DataTypes.INTEGER,
      },
      total: {
        type: DataTypes.INTEGER,
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

  Locations.associate = (models) => {
    Locations.belongsTo(models.Locations, { as: 'ParentLocationId' });
  };

  return Locations;
};
