const Cache = require('node-cache')
const updateCache = require('./updater')
const dispatcher = require('../utils/dispatcher')
const stripTypes = require('./updater/formatters/stripTypes')

const cache = new Cache({
  stdTTL: 300,
  checkperiod: 1,
  deleteOnExpire: false
})

let cacheIsUpdating = false

// Trigger update on first load
try {
  updateCache(cache)
} catch (err) {
  logger.error(`Initial cache update failed: ${err.stack}`)
  dispatcher.emit('cache_update_error')
}

cache.on('set', (key, value) => {
  dispatcher.emit('cache_update_available', { category: key, data: value })
})

cache.on('expired', async () => {
  if (!cacheIsUpdating) {
    cacheIsUpdating = true

    dispatcher.emit('cache_expired')

    try {
      await updateCache(cache)
    } catch (err) {
      logger.error(`Cache update failed: ${err.stack}`)
      dispatcher.emit('cache_update_error')
    }

    dispatcher.emit('cache_update_finished')

    cacheIsUpdating = false
  }
})

/**
 * Get all data from the cache.
 * @returns {Object} { gloves: Array<Item>, facemasks: Array<Item>, beanies: Array<Item> }
 */
function getAll () {
  const gloves = cache.get('gloves')
  const facemasks = cache.get('facemasks')
  const beanies = cache.get('beanies')

  // Strip the types in case the formatter hasn't gotten
  // stock availability data yet and they're still there
  return {
    gloves: gloves ? stripTypes(gloves) : [],
    facemasks: facemasks ? stripTypes(facemasks) : [],
    beanies: beanies ? stripTypes(beanies) : []
  }
}

exports.getAll = getAll
