const express = require('express');
const { sendEmail } = require('../controllers/emailController');
const redis = require('redis');
const client = redis.createClient();

const router = express.Router();

router.post('/', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    await sendEmail(to, subject, text);
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;