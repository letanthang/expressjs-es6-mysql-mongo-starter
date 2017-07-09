import express from 'express';
import { resSuccess } from '../helpers/http_handler.helper';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(
    (req, res) => {
      resSuccess(res, {});
    }
  );

export default router;
