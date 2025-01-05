const redis = require('redis');
const { sendPushNotification } = require('../api_gateway/controllers/pushController');

const client = redis.createClient();
const subscriber = redis.createClient();

subscriber.subscribe('push_queue');

subscriber.on('message', async (channel, message) => {
  const notification = JSON.parse(message);
  try {
    await sendPushNotification(notification.playerIds, notification.contents);
    console.log('Push notification sent successfully');
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
});