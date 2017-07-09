import CommonInterface from './common.interface';
import MySQLConnection from '../connections/mysql.connection';
import RedisConnection from '../connections/redis.connection';

export default class MySQLBaseModel extends CommonInterface {
  constructor(options, cachePrefix = 'mysql') {
    super();
    const addOnOption = {
      ...options,
      hasTimestamps: ['created_at', 'updated_at']
    };
    this.cachePrefix = cachePrefix;
    const bookshelf = new MySQLConnection();
    this.BookshelfModel = bookshelf.Model.extend(addOnOption);
    this.knex = bookshelf.knex;
    this.Redis = new RedisConnection();
    this.get = this.get.bind(this);
  }

  async get(query) {
    return this.knex.raw(query);
  }

  getAll(conditions, sort, skip, limit) {
    return this.BookshelfModel
      .where(conditions)
      .query((qb) => {
        qb.limit(limit);
        qb.offset(skip);
      })
      .sort(sort)
      .fetchAll();
  }
}

