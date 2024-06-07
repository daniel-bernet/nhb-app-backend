const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Sentiment extends Model { }

  Sentiment.init({
    SentimentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
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
