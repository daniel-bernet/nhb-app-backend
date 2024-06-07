const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.js');
const defineGroupModel = require('../models/group.js');
const definePollModel = require('../models/poll.js');
const defineQuestionModel = require('../models/question.js');
const definePollQuestionJoinModel = require('../models/pollquestionjoin.js');
const defineGroupMemberModel = require('../models/groupMember.js');
const defineAnswerModel = require('../models/answer.js');

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

const Group = defineGroupModel(sequelize, DataTypes);
const Poll = definePollModel(sequelize, DataTypes);
const Question = defineQuestionModel(sequelize, DataTypes);
const PollQuestionJoin = definePollQuestionJoinModel(sequelize, DataTypes);
const GroupMember = defineGroupMemberModel(sequelize, DataTypes);
const Answer = defineAnswerModel(sequelize, DataTypes);

// Create Poll with Questions and Default Answers for Group Members
router.post('/create-poll', verifyToken, async (req, res) => {
    const { groupID, typeID, title, description, questions } = req.body;
    const transaction = await sequelize.transaction();

    try {
        const poll = await Poll.create({
            TypeID: typeID,
            GroupID: groupID,
            Title: title,
            Description: description
        }, { transaction });

        for (const questionData of questions) {
            const question = await Question.create({
                Question: questionData.question,
                Date: new Date(),
                Duration: questionData.duration || 0, // Assume duration might be optional
                Description: questionData.description
            }, { transaction });

            await PollQuestionJoin.create({
                PollID: poll.PollID,
                QuestionID: question.QuestionID
            }, { transaction });

            for (const optionID of questionData.optionIDs) {
                // Assuming that the QuestionOptionJoin table exists and that the options are predefined in the database
                await QuestionOptionJoin.create({
                    QuestionID: question.QuestionID,
                    OptionID: optionID
                }, { transaction });
            }

            // Create default answers for each group member
            const members = await GroupMember.findAll({
                where: { GroupID: groupID }
            }, { transaction });

            // Uncomment the next line and replace 'unansweredOptionID' with the actual ID once it is added to the database
            // const unansweredOptionID = 'YOUR_UNANSWERED_OPTION_ID_HERE';
            for (const member of members) {
                await Answer.create({
                    QuestionID: question.QuestionID,
                    GroupMemberID: member.GroupMemberID,
                    OptionID: unansweredOptionID // This will be replaced with the actual option ID
                }, { transaction });
            }
        }

        await transaction.commit();
        res.status(201).json({ message: 'Poll created successfully with questions and default answers', poll });
    } catch (error) {
        await transaction.rollback();
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

        // Delete Answers associated with the Poll's Questions
        await Answer.destroy({
            where: {
                QuestionID: sequelize.where(sequelize.col('question.QuestionID'), 'IN', sequelize.literal(`(SELECT QuestionID FROM PollQuestionJoins WHERE PollID = '${pollId}')`))
            }
        }, { transaction });

        // Delete PollQuestionJoins
        await PollQuestionJoin.destroy({
            where: { PollID: pollId }
        }, { transaction });

        // Delete Questions associated with the Poll
        await Question.destroy({
            where: {
                QuestionID: sequelize.where(sequelize.col('QuestionID'), 'IN', sequelize.literal(`(SELECT QuestionID FROM PollQuestionJoins WHERE PollID = '${pollId}')`))
            }
        }, { transaction });

        // Finally, delete the Poll itself
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

// Get Poll Info with details
router.get('/info/:pollId', verifyToken, async (req, res) => {
    const { pollId } = req.params;

    try {
        const poll = await Poll.findByPk(pollId, {
            include: [{
                model: Question,
                as: 'questions',
                include: [{
                    model: Option,
                    as: 'options',
                    include: ['sentiment']
                }, {
                    model: Answer,
                    as: 'answers'
                }]
            }, {
                model: Type,
                as: 'pollType'
            }]
        });

        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        res.json(poll);
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


module.exports = router;
