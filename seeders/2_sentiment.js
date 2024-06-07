'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Sentiments', [{
            SentimentID: 1,
            Sentiment: 'u',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            SentimentID: 2,
            Sentiment: 'n',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            SentimentID: 3,
            Sentiment: 'y',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            SentimentID: 4,
            Sentiment: 'i',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Sentiments', null, {});
    }
};
