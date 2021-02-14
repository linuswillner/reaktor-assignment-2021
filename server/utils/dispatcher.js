const { EventEmitter } = require('events')

/**
 * Global event dispatcher.
 */
class Dispatcher extends EventEmitter {}
module.exports = new Dispatcher()
