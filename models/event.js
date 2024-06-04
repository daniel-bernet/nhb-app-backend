const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Event extends Model {}

  Event.init({
    EventID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    GroupID: {
      type: DataTypes.UUID,
      allowNull: false
    },
    TypeID: {
      type: DataTypes.UUID,
      allowNull: false
    },
    Title: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    Location: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'Events'
  });

  Event.associate = function (models) {
    this.belongsTo(models.Group, {
      foreignKey: 'GroupID',
      as: 'group'
    });
    this.belongsTo(models.Type, {
      foreignKey: 'TypeID',
      as: 'eventType'
    });
  };

  return Event;
};
