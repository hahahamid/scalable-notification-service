const redisClient = require('../redisClient');
const { sendEmail } = require('../api_gateway/controllers/emailController');

const subscriber = redisClient.duplicate();

subscriber.on('connect', () => {
  console.log('Subscriber connected to Redis');
});

subscriber.subscribe('email_queue');

subscriber.on('message', async (channel, message) => {
  const notification = JSON.parse(message);
  try {
    await sendEmail(notification.to, notification.subject, notification.text);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
});