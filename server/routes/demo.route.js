import express from 'express';
import DemoController from '../controllers/demo.controller';

const router = express.Router(); // eslint-disable-line new-cap
const demoController = new DemoController();

router.route('/getAll')
  .get(
    demoController.getAll);
export default router;
