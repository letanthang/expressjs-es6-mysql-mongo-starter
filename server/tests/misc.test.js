import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

describe('## Misc', () => {
  describe('# Health Check /', () => {
    it('should return OK', (done) => {
      request(app)
        .get('/')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.payload.status).to.equal('OK');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/404', () => {
    it('should return 404 status', (done) => {
      request(app)
        .get('/api/404')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.payload.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# Error Handling', () => {
    it('should handle mongoose CastError - Cast to ObjectId failed', (done) => {
      request(app)
        .get('/api/users/getOne/56z787zzz67fc')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.payload.message).to.equal('Internal Server Error');
          done();
        })
        .catch(done);
    });

    it('should handle express validation error - username is required', (done) => {
      request(app)
        .post('/api/users/create')
        .send({
          phone: '1234567890'
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.success).to.equal(false);
          expect(res.body.payload.message[0].message).to.equal('`username` is required');
          done();
        })
        .catch(done);
    });
  });
});
