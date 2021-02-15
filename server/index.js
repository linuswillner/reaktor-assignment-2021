require('./utils/logger') // Initiate global logger

const http = require('http')
const express = require('express')
const dispatcher = require('./utils/dispatcher')
const cache = require('./cache')
const stripTypes = require('./cache/updater/formatters/stripTypes')

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 5000 // Heroku provides the port via env

// Mount middleware
app.use(require('helmet')())

// Serve website
app.use(express.static('public'))

// WebSocket connection logic
io.on('connection', socket => {
  logger.debug(`Socket ${socket.id} connected.`)

  // Send all the data downstream on first connect
  socket.emit('cache_update', cache.getAll())

  // Register dispatcher => socket event forwarders
  const events = {
    cache_update_available: ({ category, data }) => {
      logger.debug('Sending new cached data to client.')
      // Strip types before sendoff
      socket.emit('cache_update_partial', { category, data: stripTypes(data) })
    },
    cache_update_finished: () => socket.emit('cache_update_finished'),
    cache_update_error: () => socket.emit('cache_update_error'),
    cache_expired: () => socket.emit('cache_expired')
  }

  // Register handlers
  for (const event in events) {
    const listener = events[event]
    dispatcher.on(event, listener)
  }

  socket.on('disconnect', reason => {
    logger.debug(`Socket ${socket.id} disconnected: ${reason}`)

    // Dump event listeners so we don't get memory leakes
    for (const event in events) {
      const listener = events[event]
      dispatcher.removeListener(event, listener)
    }
  })
})

// Start server
server.listen(port, '0.0.0.0', () => {
  logger.info(`Server listening on port ${port}`)
})
