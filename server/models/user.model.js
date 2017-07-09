import UserSc from './schemas/user.schema';
import MongoDBBaseModel from './base/mongo.base.model.js';

class UserModel extends MongoDBBaseModel {
  constructor() {
    super(UserSc, 'Users');
    // this.getDetail = this.getDetail.bind(this);
    // this.getDetailById = this.getDetailById.bind(this);
  }

  getDetail(conditions) {
    return this.MongooseModel.findOne(conditions)
      .populate({
        path: 'employee',
        model: 'Employees',
        populate: [
          {
            path: 'warehouse',
            model: 'Warehouses'
          },
          {
            path: 'department',
            model: 'Departments'
          }
        ]
      });
  }

  getDetailById(id) {
    this.MongooseModel.findOne({ _id: id })
      .populate({
        path: 'employee',
        populate: {
          path: 'warehouse',
          model: 'Warehouses'
        }
      })
      .then(rs => rs)
      .catch(err => err);
  }
}
export default new UserModel();
