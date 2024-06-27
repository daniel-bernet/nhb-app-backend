const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { Poll, Option, Sentiment, Question, PollQuestionJoin, QuestionOptionJoin, GroupMember, Answer, Group, sequelize } = require('../models');
const { transaction } = require('sequelize');

const router = express.Router();

// create poll endpoint with questions and default answers
router.post('/create-poll', verifyToken, async (req, res) => {
    const { groupID, typeID, title, description, questions } = req.body;

    try {
        const transaction = await sequelize.transaction();

        // Query for the unanswered optionID synchronously within the transaction
        const option = await Option.findOne({
            where: { Option: 'unanswered' },
            transaction
        });
        if (!option) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Unanswered option not found' });
        }
        const unansweredOptionID = option.OptionID;

        // Create the poll
        const poll = await Poll.create({
            TypeID: typeID,
            GroupID: groupID,
            Title: title,
            Description: description
        }, { transaction });

        // Fetch all group members
        const members = await GroupMember.findAll({
            where: { GroupID: groupID }
        }, { transaction });

        for (const questionData of questions) {
            const question = await Question.create({
                Question: questionData.questionText,
                Date: new Date(),
                Duration: questionData.duration || 0,
                Description: questionData.description
            }, { transaction });

            await PollQuestionJoin.create({
                PollID: poll.PollID,
                QuestionID: question.QuestionID
            }, { transaction });

            for (const optionID of questionData.options) {
                await QuestionOptionJoin.create({
                    QuestionID: question.QuestionID,
                    OptionID: optionID
                }, { transaction });
            }

            // Create default answers using the unresolved OptionID
            for (const member of members) {
                await Answer.create({
                    QuestionID: question.QuestionID,
                    GroupMemberID: member.GroupMemberID,
                    OptionID: unansweredOptionID
                }, { transaction });
            }
        }

        await transaction.commit();
        res.status(201).json({ message: 'Poll created successfully with questions and default answers', poll });
    } catch (error) {
        if (transaction) await transaction.rollback();
        console.error('Failed to create poll:', error);
        res.status(500).json({ error: error.message });
    }
});


// Delete Poll and associated entries
router.delete('/delete/:pollId', verifyToken, async (req, res) => {
    const { pollId } = req.params;
    const transaction = await sequelize.transaction();

    try {
        const poll = await Poll.findByPk(pollId);
        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        await poll.destroy({ transaction });

        await transaction.commit();
        res.status(200).json({ message: 'Poll and related data deleted successfully' });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
});

// Edit Poll details
router.patch('/edit/:pollId', verifyToken, async (req, res) => {
    const { pollId } = req.params;
    const { title, description } = req.body;

    try {
        const poll = await Poll.findByPk(pollId);
        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        poll.Title = title || poll.Title;
        poll.Description = description || poll.Description;

        await poll.save();
        res.status(200).json({ message: 'Poll updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Open a Poll
router.patch('/open/:pollId', verifyToken, async (req, res) => {
    const { pollId } = req.params;
    try {
        const poll = await Poll.findByPk(pollId);
        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' });
        }
        poll.IsClosed = false;
        await poll.save();
        res.status(200).json({ message: 'Poll is now open' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Close a Poll
router.patch('/close/:pollId', verifyToken, async (req, res) => {
    const { pollId } = req.params;
    try {
        const poll = await Poll.findByPk(pollId);
        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' });
        }
        poll.IsClosed = true;
        await poll.save();
        res.status(200).json({ message: 'Poll is now closed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all options for a poll-question
router.get('/get-options', verifyToken, async (req, res) => {
    try {
        const options = await Option.findAll({
            include: [{
                model: Sentiment,
                as: 'sentiment',
                attributes: ['Sentiment']
            }],
            attributes: ['OptionID', 'Option', 'Description', 'SentimentID']
        });

        res.status(200).json({
            data: options,
            message: 'Options fetched successfully'
        });
    } catch (error) {
        console.error('Failed to fetch options:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            details: error.message
        });
    }
});



module.exports = router;
