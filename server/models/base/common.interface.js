/* eslint no-unused-vars: 0 */
/* eslint no-empty-function: 0 */

export default class CommonInterface {
  constructor() {
    this._getCache = this._getCache.bind(this);
    this._getCacheKey = this._getCacheKey.bind(this);
    this._setCache = this._setCache.bind(this);
  }

  _getCache(id) {
    // try {
    const keyCache = this._getCacheKey(id);
    return this.Redis.getAsync(keyCache);
    // } catch (err) {
    //   return false;
    // }
  }

  _getCacheKey(id) {
    const className = this.constructor.name;
    return `${this.cachePrefix}:${className}:${id}`;
  }

  async _setCache(detail) {
    const id = detail.id;
    const keyCache = this._getCacheKey(id);
    return this.Redis.set(keyCache, JSON.stringify(detail));
  }

  async get(query) {
  }

  async getOne(id) {
  }

  async getById(id) {
  }

  async getAll(conditions, sort, skip, limit) {
  }

  async getFullList(conditions, sort) {
  }

  async findOneByCondition(conditions) {
  }

  async findOneAndUpdate(conditions, update, options) {
  }

  async findByCondition(conditions) {
  }

  async findAndModify(query, sort, doc, options) {
  }

  async countData(conditions) {
  }

  async getFirst(conditions, sort) {
  }

  async create(data) {
  }

  async update(id, data) {
  }

  async remove(id) {
  }

}
