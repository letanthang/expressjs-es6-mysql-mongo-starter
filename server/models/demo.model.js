import MySQlBaseModel from './base/mysql.base.model';

class DemoModel extends MySQlBaseModel {
  constructor() {
    super({ tableName: 'demo' });
  }
}
export default new DemoModel();
