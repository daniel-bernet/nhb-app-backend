const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Answer extends Model { }

  Answer.init({
    AnswerID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    QuestionID: {
      type: DataTypes.UUID,
      allowNull: false
    },
    GroupMemberID: {
      type: DataTypes.UUID,
      allowNull: false
    },
    OptionID: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Answer',
    tableName: 'Answers'
  });

  Answer.associate = function (models) {
    this.belongsTo(models.Question, {
      foreignKey: 'QuestionID',
      as: 'question'
    });
    this.belongsTo(models.GroupMember, {
      foreignKey: 'GroupMemberID',
      as: 'groupMember'
    });
    this.belongsTo(models.Option, {
      foreignKey: 'OptionID',
      as: 'option'
    });
    this.belongsTo(models.Group, {
      foreignKey: 'GroupMemberID',
      otherKey: 'GroupID',
      as: 'group',
      through: {
        model: models.GroupMember,
        unique: false
      },
      constraints: false
    });
  };

  return Answer;
};
