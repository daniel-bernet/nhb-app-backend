const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.js');
const defineTypeModel = require('../models/type.js');

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

const Type = defineTypeModel(sequelize, DataTypes);

// Get all types
router.get('/get-types', verifyToken, async (req, res) => {
    try {
        const types = await Type.findAll();
        res.json(types);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
