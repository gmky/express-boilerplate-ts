import log4js from "log4js";

log4js.configure({
  appenders: {
    file: {
      type: 'dateFile',
      filename: `logs/${process.env.SERVICE_NAME}-access.log`,
      pattern: 'yyyy-MM-dd',
      numBackups: 5,
      alwaysIncludePattern: true,
      keepFileExt: true,
      fileNameSep: '-'
    },
    console: {
      type: 'console'
    }
  },
  categories: {
    default: {
      appenders: ['file', 'console'],
      level: process.env.LOG_LEVEL || 'debug'
    }
  }
})

export const getLogger = (ctx: string) => log4js.getLogger(`[${ctx.padEnd(11, ' ')}]`);

export default log4js;