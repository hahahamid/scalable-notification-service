const OneSignal = require('onesignal-node');    
const { ONE_SIGNAL_APP_ID, ONE_SIGNAL_REST_API_KEY } = require('../../config/config');

const client = new OneSignal.Client(ONE_SIGNAL_APP_ID, ONE_SIGNAL_REST_API_KEY);

async function sendPushNotification(playerIds, contents) {
  const notification = new OneSignal.Notification();
  notification.setContents(contents);
  notification.includePlayerIds(playerIds);
  await client.sendNotification(notification);
}

module.exports = { sendPushNotification };