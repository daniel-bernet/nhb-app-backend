const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Band extends Model { }

  Band.init({
    BandID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
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
      as: 'subGroups',
      onDelete: 'cascade'
    });
  };

  return Band;
};
