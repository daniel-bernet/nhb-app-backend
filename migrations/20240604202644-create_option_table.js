'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Options', {
      OptionID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      SentimentID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Sentiments',
          key: 'SentimentID'
        },
        onDelete: 'CASCADE'
      },
      Option: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      Description: {
        type: Sequelize.STRING(512),
        allowNull: true
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
    await queryInterface.dropTable('Options');
  }
};
