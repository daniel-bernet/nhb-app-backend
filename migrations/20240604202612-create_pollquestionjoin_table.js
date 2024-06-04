'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PollQuestionJoins', {
      PollQuestionID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      PollID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Polls',
          key: 'PollID'
        },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('PollQuestionJoins');
  }
};
