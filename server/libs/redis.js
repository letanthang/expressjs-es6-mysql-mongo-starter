/* eslint no-console: 0 */
import redis from 'redis';
import Promise from 'bluebird';

// config should be imported before importing any other file
import config from '../../config/config';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const instance = {};

export default class MyRedis {
  constructor(name = 'default') {
    if (typeof instance[name] === 'undefined') {
      if (typeof config.mongo[name] !== 'undefined') {
        const redisConfig = config.redis[name];
        const redisClient = redis.createClient(redisConfig.port, redisConfig.host);
        redisClient.on('connect', () => {
          console.log(`Redis Server ${name} is connected!`);
        });
        instance[name] = redisClient;
      } else {
        throw new Error(`unable to connect to redis: ${name}`);
      }
    }
    return instance[name];
  }

  getConnStr(name) {
    return config.mongo[name].host;
  }
}
