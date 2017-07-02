import UserSc from './schemas/user.schema';
import BaseModel from './base.model';

class UserModel extends BaseModel {
  constructor(schema, name) {
    super(schema, name);
    this.getDetail = this.getDetail.bind(this);
    this.getDetailById = this.getDetailById.bind(this);
  }

  getDetail(conditions) {
    return this.MongooseModel.findOne(conditions);
  }

  getDetailById(id) {
    this.MongooseModel.findOne({ _id: id });
  }
}
/**
 * @typedef UserModel
 */
export default new UserModel(UserSc, 'Users');
