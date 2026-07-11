const express = require('express');
const router = express.Router();

/**
 * Health check endpoint for Render/docker-compose/CI.
 */
router.get('/', (req, res) => {
  res.status(200).send('OK');
});

module.exports = router;