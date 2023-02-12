declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'dev' | 'staging' | 'production';
      readonly PORT: number;
      readonly SERVICE_NAME: string;
      readonly LOG_LEVEL: string;
    }
  }
}