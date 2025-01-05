// rateLimiter.js
const client = require('../../redisClient');
const { promisify } = require('util');

const get = promisify(client.get).bind(client);
const incr = promisify(client.incr).bind(client);
const expire = promisify(client.expire).bind(client);

async function rateLimiter(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;
  if (!ip) {
    return next(new Error('Client IP not available'));
  }

  try {
    const reply = await get(ip);
    if (reply && parseInt(reply, 10) >= 100) {
      return res.status(429).json({ error: 'Too many requests' });
    }
    const increment = await incr(ip);
    if (increment === 1) {
      await expire(ip, 3600); // 1 hour expiration
    }
    next();
  } catch (err) {
    console.error('Error in rate limiter:', err);
    next(err);
  }
}

module.exports = { rateLimiter };