import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../../helpers/ErrorLog/APIError';
import constant from '../../../initial/constant';

class BaseSchema extends mongoose.Schema {
  constructor(objSchema) {
    objSchema = Object.assign(objSchema, constant.private_field);
    super(objSchema, {
      timestamps: {
        createdAt: '_created_at',
        updatedAt: '_updated_at'
      }
    });
    /**
     * Add your
     * - pre-save hooks
     * - validations
     * - virtuals
     */

    /**
     * Methods
     */
    this.method({});
    /**
     * Statics
     */
    this.statics = {
      findAndModify(query, sort, doc, options, callback) {
        return this.collection.findAndModify(query, sort, doc, options, callback);
      },
      getById(id) {
        return this.findById(id)
          .exec()
          .then((obj) => {
            if (obj) {
              return obj;
            }
            const err = new APIError('No such object exists!', httpStatus.NOT_FOUND);
            return Promise.reject(err);
          });
      },
      get(conditions) {
        return this.findOne(conditions)
          .exec()
          .then((obj) => {
            if (obj) {
              return obj;
            }
            const err = new APIError('No such object exists!', httpStatus.NOT_FOUND);
            return Promise.reject(err);
          });
      },
      /**
       * List objs in descending order of 'createdAt' timestamp.
       * @param {number} skip - Number of objs to be skipped.
       * @param {number} limit - Limit number of objs to be returned.
       * @param {object} sort - sorting.
       * @param {object} conditions - condition.
       * @returns {Promise<obj[]>}
       */
      list(conditions, sort = { createdAt: -1 }, skip = 0, limit = 10) {
        // console.log('conditions :', conditions);
        // console.log('sort :', sort);
        // console.log('skip :', skip);
        // console.log('limit :', limit);
        return this.find(conditions)
          .sort(sort)
          .skip(+skip)
          .limit(+limit)
          .exec();
      },
      /**
       * List objs in descending order of 'createdAt' timestamp.
       * @param {number} skip - Number of objs to be skipped.
       * @param {number} limit - Limit number of objs to be returned.
       * @param {object} sort - sorting.
       * @param {object} conditions - condition.
       * @returns {Promise<obj[]>}
       */
      listAll(conditions, sort = { createdAt: -1 }) {
        // console.log('conditions :', conditions);
        // console.log('sort :', sort);
        // console.log('skip :', skip);
        // console.log('limit :', limit);
        return this.find(conditions)
          .sort(sort)
          .exec();
      },
      findByCondition(conditions) {
        return this.find(conditions);
      },
      findOneByCondition(conditions) {
        return this.findOne(conditions);
      }
    };
  }
}

export default BaseSchema;
