import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/ErrorLog/APIError';
import config from '../../initial/config';
import { resSuccess } from '../helpers/http_handler.helper';
import UserModel from '../models/user.model';

export default class AuthController {
  /**
   * Returns jwt token if valid username and password is provided
   * @param req
   * @param res
   * @param next
   * @returns {*}
   */
  // static login(req, res, next) {
  //   // Ideally you'll fetch this from the db
  //   // Idea here was to show how jwt works with simplicity
  //   if (req.body.username === user.username && req.body.password === user.password) {
  //     const token = jwt.sign({
  //       username: user.username
  //     }, config.jwtSecret);
  //     return resSuccess(res, {
  //       token,
  //       username: user.username
  //     });
  //   }
  //
  //   const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
  //   return next(err);
  // }
  static login(req, res, next) {
    // Ideally you'll fetch this from the db
    // Idea here was to show how jwt works with simplicity
    UserModel.getDetail({ username: req.body.username, password: req.body.password })
      .then((userData) => {
        const token = jwt.sign({
          username: userData.username
        }, config.jwt_secret);
        userData = {
          ...userData._doc,
          token
        };
        return resSuccess(res, userData);
      })
      .catch(() => {
        const newErr = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
        return next(newErr);
      });
  }

  /**
   * This is a protected route. Will return random number only if jwt token is provided in header.
   * @param req
   * @param res
   * @returns {*}
   */
  static getRandomNumber(req, res) {
    // req.user is assigned by jwt middleware if valid token is provided
    return res.json({
      user: req.user,
      num: Math.random() * 100
    });
  }

}

