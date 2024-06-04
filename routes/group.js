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
    const { name, description } = req.body;
    try {
        const newGroup = await Group.create({
            Name: name,
            Description: description
        });
        res.status(201).json({ message: 'Group created successfully', group: newGroup });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Group endpoint
router.delete('/delete/:groupId', verifyToken, async (req, res) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findByPk(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        await group.destroy();
        res.status(200).json({ message: 'Group successfully deleted' });
    } catch (error) {
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
    const { groupId, accountId } = req.body;
    try {
        const member = await GroupMember.create({
            GroupID: groupId,
            AccountID: accountId
        });
        res.status(201).json({ message: 'Member added successfully', member });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove Member from Group
router.delete('/remove-member', verifyToken, async (req, res) => {
    const { groupId, accountId } = req.body;
    try {
        const member = await GroupMember.findOne({
            where: {
                GroupID: groupId,
                AccountID: accountId
            }
        });
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        await member.destroy();
        res.status(200).json({ message: 'Member removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
