const express = require('express');
const router = express.Router();

// Redirect root to /contacts or respond with a message
router.get('/', (req, res) => {
  res.send('Welcome to the Contacts API 👋');
});

// Use the contacts route
router.use('/contacts', require('./contacts'));

module.exports = router;
