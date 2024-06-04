'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('QuestionOptionJoins', {
      QuestionOptionID: {
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
      OptionID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Options',
          key: 'OptionID'
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
    await queryInterface.dropTable('QuestionOptionJoins');
  }
};
