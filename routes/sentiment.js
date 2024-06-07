const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.js');
const defineSentimentModel = require('../models/sentiment.js');

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

const Sentiment = defineSentimentModel(sequelize, DataTypes);

// Get all sentiments
router.get('/get-sentiments', verifyToken, async (req, res) => {
    try {
        const sentiments = await Sentiment.findAll();
        res.json(sentiments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
