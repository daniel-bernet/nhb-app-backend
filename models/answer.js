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
      through: { //not sure if this is correct, in case of error investigate here!
        model: models.GroupMember,
        unique: false
      },
      constraints: false
    });
    this.belongsTo(models.Account, {
      foreignKey: 'GroupMemberID',
      otherKey: 'AccountID',
      as: 'account',
      through: models.GroupMember,
      constraints: false
    });
  };

  return Answer;
};
