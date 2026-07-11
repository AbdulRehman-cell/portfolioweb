const express = require('express');
const router = express.Router();

// Main homepage
router.get('/', (req, res) => {
  res.render('index', { title: 'Portfolio Web' });
});

// Add additional routes as needed...

module.exports = router;