const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class GroupMember extends Model { }

  GroupMember.init(
    {
      GroupMemberID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      GroupID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Group",
          key: "GroupID",
        },
      },
      AccountID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Account",
          key: "AccountID",
        },
      },
    },
    {
      sequelize,
      modelName: "GroupMember",
      tableName: "GroupMembers",
    }
  );

  GroupMember.associate = function (models) {
    this.belongsTo(models.Group, {
      foreignKey: "GroupID",
      as: "groups",
    });
    this.belongsTo(models.Account, {
      foreignKey: "AccountID",
      as: "account",
    });
    this.hasMany(models.Answer, {
      foreignKey: "GroupMemberID",
      as: "answers",
      onDelete: 'CASCADE',
      hooks: true,
    });
  };

  return GroupMember;
};
