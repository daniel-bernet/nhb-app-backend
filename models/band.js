const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Band extends Model {}

  Band.init({
    BandID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(512),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Band',
    tableName: 'Bands'
  });

  Band.associate = function (models) {
    this.hasMany(models.Group, {
      foreignKey: 'BandID',
      as: 'groups'
    });
  };

  return Band;
};
