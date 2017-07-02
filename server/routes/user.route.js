/* eslint no-unused-vars:0 */
import express from 'express';
import validate from 'express-validation';
import Joi from '../../config/joi_i18n';
import UserController from '../controllers/user.controller';
import UserModel from '../models/user.model';

const router = express.Router(); // eslint-disable-line new-cap
const UserCrtl = new UserController(UserModel);

router.route('/login')
  .post(validate(
    {
      body: {
        username: Joi.string().required(),
        password: Joi.string().required()
      }
    }
    ),
    UserCrtl.login);
router.route('/getAll')
  /** GET /api/users - Get list of users */
  .get(UserCrtl.getAll);

/** POST /api/users/create - Create new user */
router.route('/create')
  .post(
    validate(
      {
        body: {
          username: Joi.string().required(),
          phone: Joi.string().regex(/^(01[2689]|09)[0-9]{8}$/).required()
        }
      },
      { i18n: 'vi_VN' }
    ),
    UserCrtl.create);

/** GET /api/users/:userId - Get user */
router.route('/getOne/:id')
  .get(
    validate(
      {
        params: {
          id: Joi.string().hex().required()
        }
      },
      { i18n: 'vi_VN' }
    ),
    UserCrtl.getOne);

/** PUT /api/users/:userId - Update user */
router.route('/update/:id')
  .put(
    validate(
      {
        body: {
          username: Joi.string().required(),
          phone: Joi.string().regex(/^(01[2689]|09)[0-9]{8}$/).required()
        },
        params: {
          id: Joi.string().hex().required()
        }
      },
      { i18n: 'vi_VN' }
    ),
    UserCrtl.update);

/** DELETE /api/users/:userId - Delete user */
router.route('/remove/:id')
  .delete(
    validate(
      {
        params: {
          id: Joi.string().hex().required()
        }
      },
      { i18n: 'vi_VN' }
    ),
    UserCrtl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', UserCrtl.load);

export default router;
