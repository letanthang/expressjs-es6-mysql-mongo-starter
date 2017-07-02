import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## User APIs', () => {
  let user = {
    username: 'KK123',
    password: 'KK123',
    phone: '0987654321',
    id: 1001,
    employee_id: 1001,
    department_id: 405,
    warehouse_id: 1047
  };

  describe('# POST /api/users/create', () => {
    it('should create a new user', (done) => {
      request(app)
        .post('/api/users/create')
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.payload.username).to.equal(user.username);
          expect(res.body.payload.phone).to.equal(user.phone);
          user = res.body.payload;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/users/getOne/:id', () => {
    it('should get user details', (done) => {
      request(app)
        .get(`/api/users/getOne/${user._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.payload.username).to.equal(user.username);
          expect(res.body.payload.phone).to.equal(user.phone);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when user does not exists', (done) => {
      request(app)
        .get('/api/users/getOne/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.payload.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/users/update/:id', () => {
    it('should update user details', (done) => {
      user.username = 'KK';
      request(app)
        .put(`/api/users/update/${user._id}`)
        .send(user)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.payload.username).to.equal('KK');
          expect(res.body.payload.phone).to.equal(user.phone);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/users/getAll', () => {
    it('should get all users', (done) => {
      request(app)
        .get('/api/users/getAll')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.payload).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all users (with limit and skip)', (done) => {
      request(app)
        .get('/api/users/getAll')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.payload).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/users/remove/:id', () => {
    it('should delete user', (done) => {
      request(app)
        .delete(`/api/users/remove/${user._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.payload.username).to.equal('KK');
          expect(res.body.payload.phone).to.equal(user.phone);
          done();
        })
        .catch(done);
    });
  });
});
