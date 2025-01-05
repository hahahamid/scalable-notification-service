const express = require('express');
const { sendPushNotification } = require('../controllers/pushController');
const router = express.Router();

router.post('/', async (req, res) => {
  const { playerIds, contents } = req.body;
  if (!playerIds || !contents) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    await sendPushNotification(playerIds, contents);
    res.json({ message: 'Push notification sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;