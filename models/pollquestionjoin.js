const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class PollQuestionJoin extends Model { }

  PollQuestionJoin.init({
    PollQuestionID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    PollID: {
      type: DataTypes.UUID,
      allowNull: false
    },
    QuestionID: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PollQuestionJoin',
    tableName: 'PollQuestionJoins'
  });

  PollQuestionJoin.associate = function (models) {
    this.belongsTo(models.Poll, {
      foreignKey: 'PollID',
      onDelete: 'CASCADE'
    });
    this.belongsTo(models.Question, {
      foreignKey: 'QuestionID',
      onDelete: 'CASCADE'
    });
  };

  return PollQuestionJoin;
};
