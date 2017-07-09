import knex from 'knex';
import bookshelf from 'bookshelf';
import config from '../../../initial/config';

const instance = {};

export default class MySQLDBConnection {
  constructor(name = 'default') {
    if (typeof instance[name] === 'undefined') {
      const configOption = this.getConfigOption(name);
      const knexObject = knex({
        client: 'mysql',
        connection: configOption
      });
      instance[name] = bookshelf(knexObject);
    }
    return instance[name];
  }

  getConfigOption(name) {
    return config.databases.mysql[name];
  }
}

