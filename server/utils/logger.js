const { createLogger, format, transports } = require('winston')

/**
 * Global Winston logger.
 */
global.logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'debug' : 'silly',
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.simple(),
        format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
      )
    })
  ]
})
