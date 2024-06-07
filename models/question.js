const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Question extends Model { }

  Question.init({
    QuestionID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    Question: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(512),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Question',
    tableName: 'Questions'
  });

  Question.associate = function (models) {
    this.belongsToMany(models.Poll, {
      through: models.PollQuestionJoin,
      foreignKey: 'QuestionID',
      otherKey: 'PollID',
      as: 'polls'
    });
    Question.associate = function (models) {
      this.hasMany(models.Answer, {
        foreignKey: 'QuestionID',
        onDelete: 'CASCADE',
        as: 'answers'
      });
    };
  };

  return Question;
};
