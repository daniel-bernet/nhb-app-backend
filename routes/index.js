const express = require('express');
const router = express.Router();

// Import route modules
const accountRoutes = require('./account');
const groupRoutes = require('./group');
const eventRoutes = require('./event');
const typeRoutes = require('./type');
const pollRoutes = require('./poll');
const answerRoutes = require('./answer');

// Use routes
router.use('/account', accountRoutes);
router.use('/group', groupRoutes);
router.use('/event', eventRoutes);
router.use('/type', typeRoutes);
router.use('/poll', pollRoutes);
router.use('/answer', answerRoutes);

// Http 404 - Not found
router.use((req, res, next) => {
  res.status(404).send('Sorry can\'t find that!');
});

module.exports = router;
