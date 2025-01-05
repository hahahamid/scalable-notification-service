const redis = require('redis');
const client = redis.createClient();

function rateLimiter(req, res, next) {
  const ip = req.ip;
  client.get(ip, (err, reply) => {
    if (err) throw err;
    if (reply && parseInt(reply) >= 100) {
      return res.status(429).json({ error: 'Too many requests' });
    }
    client.incr(ip, (err, reply) => {
      if (err) throw err;
      if (reply === 1) {
        client.expire(ip, 3600); // 1 hour expiry 
      }
    });
    next();
  });
}

module.exports = { rateLimiter };