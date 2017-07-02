import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import Joi from '../../config/joi_i18n';
import AuthController from '../controllers/auth.controller';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap


/**
 * @api {post} /api/auth/login Login
 * @apiVersion 1.0.0
 * @apiName login
 * @apiGroup auth
 *
 * @apiParam {String} username Username.
 * @apiParam {String} password password.
 *
 * @apiParamExample {json} Request-Example:
 * POST /api/auth/login
 {
  "username": "react",
  "password": "express"
 }
 *
 * @apiSuccessExample {json} Success-Response (example):
 * HTTP/1.1 200 OK
 {
   "success": true,
   "payload": {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlYWN0IiwiaWF0
     IjoxNDk2NzIzODE0fQ.dD1PeipHI2W8IlmIHUzFWnoyuZo-Y0pVhZnpJS62xs4",
     "username": "react"
   }
 }
 *
 * @apiErrorExample {json} Error-Response (example):
 * HTTP/1.1 200 OK
 {
   "success": false,
   "payload": {
     "message": "Authentication error"
   }
 }

 */
router.route('/login')
  .post(validate(
    {
      body: {
        username: Joi.string().required(),
        password: Joi.string().required()
      }
    }
    ),
    AuthController.login);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random-number')
  .get(expressJwt({ secret: config.jwtSecret }), AuthController.getRandomNumber);

export default router;
