'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Answers', {
      AnswerID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      QuestionID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Questions',
          key: 'QuestionID'
        },
        onDelete: 'CASCADE'
      },
      GroupMemberID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'GroupMembers',
          key: 'GroupMemberID'
        },
      },
      OptionID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Options',
          key: 'OptionID'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Answers');
  }
};
