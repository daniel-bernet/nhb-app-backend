const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { Type, sequelize, DataTypes } = require('../models');

const router = express.Router();

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
