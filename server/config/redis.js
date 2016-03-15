'use strict';

const config = require('./config');
const redis = require('redis');
const Redlock = require('redlock');
const url = require('url');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const createRedisClient = function() {
  let redisUrl = config.redisUrl;
  var client;
  if (redisUrl !== null) {
    let rtg = url.parse(redisUrl);
    client = redis.createClient(rtg.port, rtg.hostname);
    client.auth(rtg.auth.split(":")[1]);
  } else {
    client = redis.createClient();
  }

  return client;
}

const defaultClient = createRedisClient();

const redlock = new Redlock([defaultClient], {
  driftFactor: 0.01,
  retryCount: 3,
  retryDelay: 200
})

module.exports = {
  client: createRedisClient(config.redisUrl),
  createRedisClient: createRedisClient,
  redlock: redlock
};
