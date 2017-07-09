import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import demoRoutes from './demo.route.js';
import testRoutes from './test.route';
import { resSuccess } from '../helpers/http_handler.helper.js';
import packagejson from '../../package.json';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/', (req, res) =>
  resSuccess(res, {
    info: 'API Server',
    status: 'OK',
    version: packagejson.version
  })
);
router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);
router.use('/api/warehouses', demoRoutes);
router.use('/api/test', testRoutes);
router.use('/api/demo', demoRoutes);
export default router;
