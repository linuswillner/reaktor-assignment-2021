const dispatcher = require('../../utils/dispatcher')
const cache = require('../../cache')

module.exports = socket => {
  logger.debug(`Socket ${socket.id} connected.`)

  socket.send('data', cache.getAll())

  dispatcher.on('cache_update_available', (category, data) => {
    socket.send(category, data)
  })
}
