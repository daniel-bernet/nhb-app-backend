const express = require('express');
const router = express.Router();

// Import route modules
const accountRoutes = require('./account');
const groupRoutes = require('./group');

// Use routes
router.use('/account', accountRoutes);
router.use('/group', groupRoutes);

// Handle 404 - Not found
router.use((req, res, next) => {
  res.status(404).send('Sorry can\'t find that!');
});

//// Error handling middleware
//router.use((err, req, res, next) => {
//  console.error(err.stack);
//  res.status(500).send('Something broke!');
//});

module.exports = router;
