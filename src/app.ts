import express, { Express } from 'express';
import cors from 'cors';
import helm from 'helmet';
import compression from 'compression';
import { json } from 'body-parser';
import { getLogger } from './configs';
import { errorHandler, loggingHandler } from './middlewares';
import routes from './routes';

const logger = getLogger('Application');

const app: Express = express();

app.use(cors());
logger.info('Configured cors plugin');

app.use(helm());
logger.info('Configured helm plugin');

app.use(compression());
logger.info('Configured compression plugin');

app.use(json());
logger.info('Configured body parser plugin');

app.use(loggingHandler);
logger.info('Initializing request logger');

app.use('/', routes);

app.use(errorHandler);
logger.info('Initialized global error handler');

export default app;