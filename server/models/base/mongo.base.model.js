import Promise from 'bluebird';
import CommonInterface from './common.interface';
import BaseSchema from './../schemas/base.schema.js';
import MongoDBConnection from '../connections/mongodb.connection';
import RedisConnection from '../connections/redis.connection';
import * as constant from '../../../initial/constant';
import * as baseHelper from '../../helpers/base.helper.js';

export default class MongoDBBaseModel extends CommonInterface {
  constructor(schema, name, cachePrefix = 'mongo') {
    super();
    this.cachePrefix = cachePrefix;
    const Mongoose = new MongoDBConnection();
    this.Redis = new RedisConnection();
    const Schema = new BaseSchema(schema);
    this.Schema = Schema;
    this.MongooseModel = Mongoose.model(name, Schema);
    this.get = this.get.bind(this);
    this.getById = this.getById.bind(this);
    this.getAll = this.getAll.bind(this);
    this.countData = this.countData.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.updateBase = this.updateBase.bind(this);
  }


  async findOneAndUpdate(conditions, update, options) {
    return new Promise(
      (resolve, reject) =>
        this.MongooseModel.findOneAndUpdate(
          conditions,
          update,
          options,
          (err, object) => {
            if (err) {
              reject(err);
            } else {
              resolve(object);
            }
          })
    );
  }

  async findAndModify(query, sort, doc, options) {
    return new Promise((resolve, reject) => this.MongooseModel.findAndModify(
      query, // query
      sort,  // sort order
      { $set: doc }, // replacement
      options, // options
      (err, object) => {
        if (err) {
          reject(err);
        } else {
          resolve(object.value);
        }
      })
    );
  }

  async get(query) {
    return await this.MongooseModel.get(...query, { _status: 1 });
  }

  async getOne(id) {
    try {
      const cache = await this._getCache(id);
      if (cache) {
        return this.MongooseModel.hydrate(baseHelper.bindingObjectFromArray(
          {},
          JSON.parse(cache),
          Object.keys(this.Schema.paths))
        );
      }
      const detail = await this.MongooseModel.get({ _id: id });
      this._setCache(detail);
      return detail;
    } catch (err) {
      return false;
    }
  }

  async getById(id) {
    return await this.MongooseModel.getById(id);
  }

  async getAll(conditions, sort, skip, limit) {
    return await this.MongooseModel.list({ ...conditions, _status: 1 }, sort, skip, limit);
  }

  async getFullList(conditions, sort) {
    return await this.MongooseModel.listAll({ ...conditions, _status: 1 }, sort);
  }

  async findOneByCondition(conditions) {
    return await this.MongooseModel.findOneByCondition({ ...conditions, _status: 1 });
  }

  async findByCondition(conditions) {
    return await this.MongooseModel.findByCondition({ ...conditions, _status: 1 });
  }

  async countData(conditions) {
    return await this.MongooseModel.findByCondition({ ...conditions, _status: 1 }).count();
  }

  async getFirst(conditions, sort) {
    const result = await this.getAll(conditions, sort, 0, 1);
    return result[0];
  }

  async create(data) {
    const finalData = baseHelper.bindingObjectFromArray(
      {
        _created_by: data.created_by,
        _status: 1
      },
      data, Object.keys(this.Schema.paths));
    const objData = new this.MongooseModel(finalData);
    if (typeof this.beforeCreate === 'function') {
      await this.beforeCreate(objData);
    }
    return await objData.save();
  }

  async update(id, data) {
    let objData = Object.assign({}, data);
    objData = baseHelper.deleteAttributeInObject(objData, Object.keys(constant.private_field));
    // objData._updated_by = config.sample_user.id;
    if (typeof this.beforeUpdate === 'function') {
      await this.beforeUpdate(objData);
    }
    return await this.updateBase({ _id: id, _status: 1 }, objData);
  }

  async remove(id) {
    return await this.updateBase({ _id: id }, {
      _status: -1,
      _deleted_at: new Date(),
      // _deleted_by: config.sample_user.id
    });
  }

  async updateBase(conditions, data) {
    return new Promise((resolve, reject) => this.MongooseModel.get(conditions)
      .then((objData) => {
        objData = Object.assign(objData, data);
        return objData.save()
          .then((savedObject) => {
            this._setCache(savedObject);
            resolve(savedObject);
          })
          .catch(e => reject(e));
      })
      .catch(e => reject(e))
    );
  }
}
