const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

// Redirect root to /contacts or respond with a message
router.get('/', (req, res) => {
  //#swagger.tags =['Welcome to the Contacts API']
  res.send('Welcome to the Contacts API 👋');
});

// Use the contacts route
router.use('/contacts', require('./contacts'));

module.exports = router;
