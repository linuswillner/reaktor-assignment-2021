module.exports = socket => {
  logger.debug(`Socket ${socket.id} connected.`)
  socket.emit('data', {})
}
