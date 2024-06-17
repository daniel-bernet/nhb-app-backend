const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { Poll, Option, Sentiment, Question, PollQuestionJoin, QuestionOptionJoin, GroupMember, Answer, Group, sequelize } = require('../models');

const router = express.Router();

// Submit answers for all questions of a specific poll
router.post('/submit-answer', verifyToken, async (req, res) => {
    const { pollId, answers } = req.body; // answers as array of {questionId, optionId}
    const accountId = req.account.accountId;

    const transaction = await sequelize.transaction();

    try {
        // Check the poll exists and is not closed
        const poll = await Poll.findByPk(pollId, { transaction });
        if (!poll) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Poll not found' });
        }
        if (poll.IsClosed) {
            await transaction.rollback();
            return res.status(403).json({ error: 'Poll is closed' });
        }

        // Check if account is member of associated group
        const groupMember = await GroupMember.findOne({
            where: { AccountID: accountId, GroupID: poll.GroupID },
            transaction
        });
        if (!groupMember) {
            await transaction.rollback();
            return res.status(403).json({ error: 'User is not a member of the poll\'s group' });
        }

        const questions = await Question.findAll({
            include: [{
                model: Poll,
                as: 'polls',
                where: { PollID: pollId },
                attributes: [],
                through: { attributes: [] }
            }, {
                model: Option,
                as: 'options',
                include: [{
                    model: Sentiment,
                    as: 'sentiment'
                }]
            }],
            transaction
        });

        if (answers.length !== questions.length) {
            await transaction.rollback();
            return res.status(400).json({ error: 'All questions must be answered' });
        }

        for (const answerData of answers) {
            const question = questions.find(q => q.QuestionID === answerData.questionId);
            if (!question) {
                await transaction.rollback();
                return res.status(400).json({ error: 'Invalid question provided' });
            }

            const validOption = question.options.find(o => o.OptionID === answerData.optionId);
            if (!validOption) {
                await transaction.rollback();
                return res.status(400).json({ error: 'Invalid option provided for question ' + answerData.questionId });
            }

            // update default answer
            await Answer.update({
                OptionID: answerData.optionId
            }, {
                where: {
                    QuestionID: answerData.questionId,
                    GroupMemberID: groupMember.GroupMemberID
                },
                transaction
            });
        }

        await transaction.commit();
        res.status(200).json({ message: 'Answers submitted successfully' });
    } catch (error) {
        await transaction.rollback();
        console.error('Error submitting answers:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});


module.exports = router;
