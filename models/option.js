const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Option extends Model {}

  Option.init({
    OptionID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    SentimentID: {
      type: DataTypes.UUID,
      allowNull: false
    },
    Option: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(512),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Option',
    tableName: 'Options'
  });

  Option.associate = function (models) {
    this.belongsToMany(models.Question, {
      through: models.QuestionOptionJoin,
      foreignKey: 'OptionID',
      otherKey: 'QuestionID',
      as: 'questions'
    });
    this.belongsTo(models.Sentiment, {
      foreignKey: 'SentimentID',
      as: 'sentiment'
    });
  };

  return Option;
};
