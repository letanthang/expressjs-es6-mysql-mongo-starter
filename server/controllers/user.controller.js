/* eslint no-unused-vars:0 */
import 'babel-polyfill';
import jwt from 'jsonwebtoken';
import BaseController from './base.controller';
import config from '../../config/config';
import { resSuccess, resError } from '../helpers/http_handler.helper';


export default class UserController extends BaseController {
  constructor(Model) {
    super(Model);
    this.load = this.load.bind(this);
    this.get = this.get.bind(this);
    this.login = this.login.bind(this);
  }

  login(req, res, next) {
    // Ideally you'll fetch this from the db
    // Idea here was to show how jwt works with simplicity
    this.Model.getDetail({ username: req.body.username, password: req.body.password })
      .then((userData) => {
        const token = jwt.sign({
          username: userData.username
        }, config.jwtSecret);
        userData = {
          ...userData._doc,
          token
        };
        return resSuccess(res, userData);
      })
      .catch(err => resError(res, err));
  }

  /**
   * Load user and append to req.
   */
  async load(req, res, next, id) {
    this.Model.getById(id)
      .then((user) => {
        req.user = user;
        return next();
      })
      .catch(e => next(e));
  }

  /**
   * Get user
   * @returns {User}
   */
  async get(req, res) {
    return res.json(req.user);
  }
}
