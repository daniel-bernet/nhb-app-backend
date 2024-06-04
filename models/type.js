const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Type extends Model {}

  Type.init({
    TypeID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    Label: {
      type: DataTypes.STRING(64),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Type',
    tableName: 'Types'
  });

  Type.associate = function (models) {
    this.hasMany(models.Event, {
      foreignKey: 'TypeID',
      as: 'events'
    });
    this.hasMany(models.Poll, {
      foreignKey: 'TypeID',
      as: 'polls'
    });
  };

  return Type;
};
