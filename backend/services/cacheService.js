const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: process.env.CACHE_TTL || 3600 });

module.exports = {
  get: (key) => cache.get(key),
  set: (key, value) => cache.set(key, value),
  del: (key) => cache.del(key),
  flush: () => cache.flushAll(),
};
