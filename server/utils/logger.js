const { createLogger, format, transports } = require('winston')

global.logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  ]
})
