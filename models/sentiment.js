const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Sentiment extends Model {}

  Sentiment.init({
    SentimentID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    Sentiment: {
      type: DataTypes.STRING(1),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Sentiment',
    tableName: 'Sentiments'
  });

  Sentiment.associate = function (models) {
    this.hasMany(models.Option, {
      foreignKey: 'SentimentID',
      as: 'options'
    });
  };

  return Sentiment;
};
