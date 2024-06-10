const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.js');
const defineGroupModel = require('../models/group.js');
const defineGroupMemberModel = require('../models/groupMember.js');

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
const GroupMember = defineGroupMemberModel(sequelize, DataTypes);

// Create Group endpoint
router.post('/create', verifyToken, async (req, res) => {
    const accountId = req.account.accountId;
    const { name, description } = req.body;

    const transaction = await sequelize.transaction();

    try {
        const newGroup = await Group.create({
            Name: name,
            Description: description,
            BandID: 1
        }, { transaction });

        await GroupMember.create({
            GroupID: newGroup.GroupID,
            AccountID: accountId
        }, { transaction });

        await transaction.commit();

        res.status(201).json({ message: 'Group created successfully, member added', group: newGroup });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
});

// Delete Group endpoint
router.delete('/delete/:groupId', verifyToken, async (req, res) => {
    const { groupId } = req.params;
    const transaction = await sequelize.transaction();
    try {
        const group = await Group.findByPk(groupId, { transaction });
        if (!group) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Group not found' });
        }

        await Answer.destroy({ where: { GroupID: groupId }, transaction });
        await PollQuestionJoin.destroy({ where: { PollID: groupId }, transaction });
        await Question.destroy({ where: { GroupID: groupId }, transaction });
        await Poll.destroy({ where: { GroupID: groupId }, transaction });
        await Event.destroy({ where: { GroupID: groupId }, transaction });
        await GroupMember.destroy({ where: { GroupID: groupId }, transaction });
        await group.destroy({ transaction });

        await transaction.commit();
        res.status(200).json({ message: 'Group and all related data successfully deleted' });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
});

// Get Group Info
router.get('/info/:groupId', verifyToken, async (req, res) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findByPk(groupId, {
            include: ['members']
        });
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Edit Group Info
router.patch('/edit/:groupId', verifyToken, async (req, res) => {
    const { groupId } = req.params;
    const { name, description } = req.body;
    try {
        const group = await Group.findByPk(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        group.Name = name || group.Name;
        group.Description = description || group.Description;
        await group.save();
        res.status(200).json({ message: 'Group updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add Member to Group
router.post('/add-member', verifyToken, async (req, res) => {
    const { groupId, manipulateAccountId } = req.body;
    const transaction = await sequelize.transaction();
    try {
        const member = await GroupMember.create({
            GroupID: groupId,
            AccountID: manipulateAccountId
        }, { transaction });

        // Retrieve all open polls to set default answers
        const polls = await Poll.findAll({ where: { GroupID: groupId, IsClosed: false }, transaction });
        for (const poll of polls) {
            const questions = await Question.findAll({ where: { PollID: poll.PollID }, transaction });
            for (const question of questions) {
                await Answer.create({
                    QuestionID: question.QuestionID,
                    GroupMemberID: member.GroupMemberID,
                    OptionID: 'UNANSWERED_OPTION_ID', // This should be replaced with the actual ID once available
                }, { transaction });
            }
        }

        await transaction.commit();
        res.status(201).json({ message: 'Member added successfully and default answers set for open polls', member });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
});

// Remove Member from Group
router.delete('/remove-member', verifyToken, async (req, res) => {
    const { groupId, manipulateAccountId } = req.body;
    const transaction = await sequelize.transaction();
    try {
        const member = await GroupMember.findOne({
            where: {
                GroupID: groupId,
                AccountID: manipulateAccountId
            },
            transaction
        });
        if (!member) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Member not found' });
        }

        await Answer.destroy({
            where: { GroupMemberID: member.GroupMemberID },
            transaction
        });

        await member.destroy({ transaction });

        const remainingMembers = await GroupMember.count({
            where: { GroupID: groupId },
            transaction
        });
        if (remainingMembers === 0) {
            await Event.destroy({ where: { GroupID: groupId }, transaction });
            await Poll.destroy({ where: { GroupID: groupId }, transaction });
            await Group.destroy({ where: { GroupID: groupId }, transaction });
        }

        await transaction.commit();
        const message = remainingMembers === 0 ? 'Member removed and group deleted due to no remaining members' : 'Member removed successfully';
        res.status(200).json({ message });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
});


// Get Events for a Group
router.get('/events/:groupId', verifyToken, async (req, res) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findByPk(groupId, {
            include: [{
                model: sequelize.models.Event,
                as: 'events'
            }]
        });
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.json(group.events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Polls for a Group
router.get('/polls/:groupId', verifyToken, async (req, res) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findByPk(groupId, {
            include: [{
                model: sequelize.models.Poll,
                as: 'polls'
            }]
        });
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.json(group.polls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
