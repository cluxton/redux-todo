var config = require('./config');
var redis = require('redis');
var url = require('url');
var bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var createRedisClient = function(redisUrl, promisify) {

  

  var client;
  if (redisUrl !== null) {
    var rtg = url.parse(redisUrl);
    client = redis.createClient(rtg.port, rtg.hostname);
    client.auth(rtg.auth.split(":")[1]);
  } else {
    client = redis.createClient();
  }

  return client;
}

module.exports = createRedisClient(config.redisUrl);
module.exports.createNewClient = createRedisClient;
