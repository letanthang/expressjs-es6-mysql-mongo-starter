import mongoose from 'mongoose';
import Promise from 'bluebird';

// config should be imported before importing any other file
import config from '../../../initial/config';

const instance = {};

export default class MongoDBConnection {
  constructor(name = 'default') {
    if (typeof instance[name] === 'undefined') {
      const connStr = this.getConnStr(name);
      const mongo = new mongoose.Mongoose();
      mongo.connect(connStr, config.databases.mongodb[name], () => {
        console.log(`MongoDB Server ${name} is connected!`);// eslint-disable-line no-console
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
    return config.databases.mongodb[name].uri;
  }
}
