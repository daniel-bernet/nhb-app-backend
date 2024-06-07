const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.js');
const defineAnswerModel = require('../models/answer');

const router = express.Router();
const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: config.development.dialect,
        port: config.development.port,
    }
);

const Answer = defineAnswerModel(sequelize, DataTypes);

// Edit an Answer
router.patch('/edit-answer/:answerId', verifyToken, async (req, res) => {
    const { answerId } = req.params;
    const { optionId } = req.body;

    try {
        const answer = await Answer.findByPk(answerId);
        if (!answer) {
            return res.status(404).json({ error: 'Answer not found' });
        }

        answer.OptionID = optionId || answer.OptionID;
        await answer.save();

        res.status(200).json({ message: 'Answer updated successfully', answer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
