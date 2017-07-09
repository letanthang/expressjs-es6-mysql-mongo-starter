// import mongoose from 'mongoose';
// import request from 'supertest-as-promised';
// import httpStatus from 'http-status';
// import chai, { expect } from 'chai';
// import app from '../../index';
//
// chai.config.includeStack = true;
//
// /**
//  * root level hooks
//  */
// after((done) => {
//   // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
//   mongoose.models = {};
//   mongoose.modelSchemas = {};
//   mongoose.connection.close();
//   done();
// });
//
// describe('## Demo APIs', () => {
//   describe('# POST api/demo/getAll', () => {
//     it('should return demo', (done) => {
//       request(app)
//         .get('/api/demo/getAll')
//         .expect(httpStatus.OK)
//         .then((res) => {
//           expect(res.body.success).to.equal(true);
//           done();
//         })
//         .catch(done);
//     });
//   });
// });
