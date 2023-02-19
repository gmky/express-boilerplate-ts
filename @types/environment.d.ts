declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'dev' | 'staging' | 'production';
      readonly PORT: number;
      readonly SERVICE_NAME: string;
      readonly LOG_LEVEL: string;
      readonly MONGO_URI: string;
      readonly SALT_ROUNDS: number;
    }
  }

  namespace Express {
    export interface Request {
      user?: any
    }
  }
}

export {}