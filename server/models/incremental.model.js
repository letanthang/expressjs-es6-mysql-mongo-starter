import MongoDBBaseModel from './base/mongo.base.model.js';
import IncrementalSc from './schemas/incremental.schema';

class IncrementalModel extends MongoDBBaseModel {
  constructor() {
    super(IncrementalSc, 'incremental');
  }

  async getIncremental(name) {
    const cond = {
      name
    };
    const detail = await this.getFirst(cond);
    let incremantal = 0;
    if (detail) {
      incremantal = detail.time;
    }
    return incremantal;
  }

  async newIncremental(name, time) {
    const cond = {
      name
    };
    const detail = await this.getFirst(cond);
    detail.time = time;
    return await this.update(detail._id, detail);
  }
}
export default new IncrementalModel();
