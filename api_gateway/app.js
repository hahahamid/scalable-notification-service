const express = require('express');
const redisClient = require('../redisClient');
const { rateLimiter } = require('./utils/rateLimiter');
const emailRoutes = require('./routes/emailRoutes');
const pushRoutes = require('./routes/pushRoutes');

const app = express();

app.use(express.json());
app.use(rateLimiter);

app.use('/api/v1/email', emailRoutes);
app.use('/api/v1/push', pushRoutes);

async function startServer() {
//   await redisClient.connect();
  app.listen(3000, () => {
    console.log('API Gateway is running on port 3000');
  });
}

startServer();