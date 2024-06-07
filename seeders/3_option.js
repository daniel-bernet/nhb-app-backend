'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Options', [{
            OptionID: uuidv4(),
            SentimentID: 1,
            Option: 'unanswered',
            Description: 'Standard for unanswered questions',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            OptionID: uuidv4(),
            SentimentID: 2,
            Option: 'no',
            Description: 'Give a negative answer',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            OptionID: uuidv4(),
            SentimentID: 3,
            Option: 'yes',
            Description: 'Give a positive answer',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            OptionID: uuidv4(),
            SentimentID: 4,
            Option: 'i don\'t know yet',
            Description: 'Pass up on giving an answer at this moment',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            OptionID: uuidv4(),
            SentimentID: 4,
            Option: 'i don\'t care',
            Description: 'Give an undefinitive answer',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Options', null, {});
    }
};
