const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.js');
const defineQuestionModel = require('../models/question.js');

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

const Question = defineQuestionModel(sequelize, DataTypes);

// Edit a Question
router.patch('/edit-question/:questionId', verifyToken, async (req, res) => {
    const { questionId } = req.params;
    const { question, description, date, duration } = req.body;
    try {
        const questionToUpdate = await Question.findByPk(questionId);
        if (!questionToUpdate) {
            return res.status(404).json({ error: 'Question not found' });
        }

        questionToUpdate.Question = question || questionToUpdate.Question;
        questionToUpdate.Description = description || questionToUpdate.Description;
        questionToUpdate.Date = date || questionToUpdate.Date;
        questionToUpdate.Duration = duration || questionToUpdate.Duration;
        await questionToUpdate.save();

        res.status(200).json({ message: 'Question updated successfully', question: questionToUpdate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a Question
router.delete('/delete-question/:questionId', verifyToken, async (req, res) => {
    const { questionId } = req.params;
    try {
        const questionToDelete = await Question.findByPk(questionId);
        if (!questionToDelete) {
            return res.status(404).json({ error: 'Question not found' });
        }

        await questionToDelete.destroy();
        res.status(200).json({ message: 'Question and all related answers deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;