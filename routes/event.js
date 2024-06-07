const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.js');
const defineEventModel = require('../models/event');

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

const Event = defineEventModel(sequelize, DataTypes);

// Create Event
router.post('/create', verifyToken, async (req, res) => {
    const { GroupID, TypeID, Title, Description, Location, Date, Duration } = req.body;
    try {
        const event = await Event.create({
            GroupID, TypeID, Title, Description, Location, Date, Duration
        });
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Event Information
router.get('/info/:eventId', verifyToken, async (req, res) => {
    const { eventId } = req.params;
    try {
        const event = await Event.findByPk(eventId, {
            include: ['group', 'eventType']
        });
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Event
router.delete('/delete/:eventId', verifyToken, async (req, res) => {
    const { eventId } = req.params;
    try {
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        await event.destroy();
        res.status(200).json({ message: 'Event successfully deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Edit Event
router.patch('/edit/:eventId', verifyToken, async (req, res) => {
    const { eventId } = req.params;
    const { Title, Description, Location, Date, Duration } = req.body;
    try {
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        event.Title = Title || event.Title;
        event.Description = Description || event.Description;
        event.Location = Location || event.Location;
        event.Date = Date || event.Date;
        event.Duration = Duration || event.Duration;

        await event.save();
        res.status(200).json({ message: 'Event updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
