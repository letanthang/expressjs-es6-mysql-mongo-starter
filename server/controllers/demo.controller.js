import { resSuccess } from '../helpers/http_handler.helper';

export default class DemoController {
  getAll(req, res) {
    resSuccess(res, [req]);
  }
}
