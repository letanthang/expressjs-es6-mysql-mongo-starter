/* eslint no-console: 0 */
import mongoose from 'mongoose';
import Promise from 'bluebird';

// config should be imported before importing any other file
import config from '../../config/config';

const instance = {};

export default class MyMongo {
  constructor(name = 'default') {
    if (typeof instance[name] === 'undefined') {
      const connStr = this.getConnStr(name);
      const mongo = new mongoose.Mongoose();
      mongo.connect(connStr, config.mongo[name].options, () => {
        console.log(`MongoDB Server ${name} is connected!`);
      });
      mongo.connection.on('error', () => {
        throw new Error(`unable to connect to database: ${connStr}`);
      });
      mongo.Promise = Promise;
      instance[name] = mongo;
    }
    return instance[name];
  }

  getConnStr(name) {
    return config.mongo[name].host;
  }
}
