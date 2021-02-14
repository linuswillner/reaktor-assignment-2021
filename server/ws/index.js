const events = require('./events')

exports.registerIOEvents = io => {
  logger.debug('Registering event handlers for the following IO events:')

  for (const event in events) {
    console.debug(`- ${event}`)
    io.on(event, events[event])
  }
}
