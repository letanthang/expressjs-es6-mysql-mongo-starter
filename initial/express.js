import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import httpStatus from 'http-status';
import expressWinston from 'express-winston';
import expressValidation from 'express-validation';
import helmet from 'helmet';
// import { monitor } from 'appmetrics-dash';
import { loggerInfo, loggerError, loggerConsole } from './winston';
import routes from '../server/routes/index.route';
import config from './config';
import APIError from '../server/helpers/ErrorLog/APIError';
import { resError } from '../server/helpers/http_handler.helper.js';

const app = express();
// app.use(express.static(`${__dirname}/public`));
// monitor({
//   title: 'API System Dashboard Monitor',
//   url: '/monitor',
//   docs: '',
//   nodereport: null,
//   port: config.port + 100,
// });

if (config.env === 'development' || config.env === 'local') {
  app.use(morgan('dev'));
// app.use(morgan('combined', { stream: winstonInstance.stream }));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

if (config.env === 'development' || config.env === 'production') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance: loggerInfo,
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,
  }));
}
// mount all routes on /api path
app.use('/', routes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(
      error => ({
        field: error.field,
        message: error.messages.join(', ').replace(/\"/g, '`') // eslint-disable-line
      })
    );
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});
if (config.env === 'development' || config.env === 'production') {
  app.use(expressWinston.errorLogger({
    winstonInstance: loggerError
  }));
} else if (config.env === 'local') {
  app.use(expressWinston.errorLogger({
    winstonInstance: loggerConsole,
  }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  resError(res, {
    message: err.isPublic ? err.message : httpStatus[err.status],
    // stack: config.env === 'development' ? err.stack : {}
  })
);

export default app;
