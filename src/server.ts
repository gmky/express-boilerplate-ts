import * as dotenv from 'dotenv';
dotenv.config();

import { getLogger, initDatabase } from './configs';
const logger = getLogger('Application');

logger.info(`Start server with profile: ${process.env.NODE_ENV}`)

import app from './app';

const port: Number = Number(process.env.PORT) || 3000;

async function startServer() {
  await initDatabase();
  app.listen(port, () => {
    logger.info(`Application is running on port ${port}`);
  })
}

startServer();