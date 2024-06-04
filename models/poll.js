const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Poll extends Model {}

  Poll.init({
    PollID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    TypeID: {
      type: DataTypes.UUID,
      allowNull: false
    },
    GroupID: {
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
    IsClosed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Poll',
    tableName: 'Polls'
  });

  Poll.associate = function (models) {
    this.belongsToMany(models.Question, {
      through: models.PollQuestionJoin,
      foreignKey: 'PollID',
      otherKey: 'QuestionID',
      as: 'questions'
    });
    this.belongsTo(models.Group, {
      foreignKey: 'GroupID',
      as: 'group'
    });
    this.belongsTo(models.Type, {
      foreignKey: 'TypeID',
      as: 'pollType'
    });
  };

  return Poll;
};
