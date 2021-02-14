const { createLogger, format, transports } = require('winston')

global.logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'debug' : 'silly',
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  ]
})
