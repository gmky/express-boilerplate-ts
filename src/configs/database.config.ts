import mongoose from "mongoose"
import { getLogger } from "./logging.config";

const log = getLogger('Application');

export const initDatabase = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_URI as string);
    log.info('Database connection was established');
  } catch (error) {
    log.error('Unable to connect to database', error);
    process.exit(1);
  }
}

export const closeDatabase = async () => {
  await mongoose.disconnect();
}