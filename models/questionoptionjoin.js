const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QuestionOptionJoin extends Model { }

  QuestionOptionJoin.init({
    QuestionOptionID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    QuestionID: {
      type: DataTypes.UUID,
      allowNull: false
    },
    OptionID: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'QuestionOptionJoin',
    tableName: 'QuestionOptionJoins'
  });

  return QuestionOptionJoin;
};
