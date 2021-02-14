const dispatcher = require('../../utils/dispatcher')
const cache = require('../../cache')
const stripTypes = require('../../cache/updater/formatters/stripTypes')

module.exports = socket => {
  logger.debug(`Socket ${socket.id} connected.`)

  // Send all the data downstream on first connect
  socket.emit('data', cache.getAll())

  dispatcher.on('cache_update_available', ({ category, data }) => {
    logger.debug('Sending new cached data to client.')
    socket.emit('data_partial', { category, data: stripTypes(data) }) // Strip types before sendoff
  })
}
