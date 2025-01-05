const express = require('express');
const redis = require('redis');
const { rateLimiter } = require('./utils/rateLimiter');
const emailRoutes = require('./routes/emailRoutes');
const pushRoutes = require('./routes/pushRoutes');

const app = express();
const client = redis.createClient();

app.use(express.json());

app.use(rateLimiter);

app.use('/api/v1/email', emailRoutes);
app.use('/api/v1/push', pushRoutes);

app.listen(3000, () => {
  console.log('API Gateway is running on port 3000');
});