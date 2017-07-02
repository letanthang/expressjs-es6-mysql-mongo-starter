const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017),
  REDIS_HOST: Joi.string().required()
    .description('Redis host url'),
  REDIS_PORT: Joi.number()
    .default(6379)
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  sample_user: {
    id: 0,
    username: '',
    fullname: '',
    department_id: 0,
    department_name: '',
    email: '',
    avatar: ''
  },
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    default: {
      host: envVars.MONGO_HOST,
      port: envVars.MONGO_PORT,
      options: {
        server: {
          poolSize: 5,
          socketOptions: {
            keepAlive: 1
          }
        },
        // user: 'admin',
        // pass: '123456'
      }
    },
    test: {
      host: 'mongodb://localhost/shiip',
      port: envVars.MONGO_PORT,
      options: {}
    }
  },
  redis: {
    default: {
      host: envVars.REDIS_HOST,
      port: envVars.REDIS_PORT
    }
  },
  cache: {
    prefix: 'expressjs-es6-mysql-mongo-starter'
  },
  private_field: {
    _status: { type: Number, default: 1 },
    _created_by: { type: Number },
    _updated_by: { type: Number },
    _deleted_by: { type: Number }
  }
};

module.exports = config;
