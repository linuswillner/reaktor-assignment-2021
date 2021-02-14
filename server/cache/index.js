const Cache = require('node-cache')
const updateCache = require('./updater')
const dispatcher = require('../utils/dispatcher')
const stripTypes = require('./updater/formatters/stripTypes')

const cache = new Cache({
  stdTTL: 300,
  checkperiod: 1,
  deleteOnExpire: false
})

// Trigger update on first load
updateCache()

cache.on('set', (key, value) => {
  dispatcher.emit('cache_update_available', {
    category: key,
    data: getAll()
  })
})

cache.on('expired', () => {
  dispatcher.emit('cache_expired')
  updateCache()
})

function getAll () {
  // Strip the types in case the formatter hasn't gotten
  // availability data yet and they're still there
  return {
    gloves: stripTypes(cache.get('gloves')) || [],
    facemasks: stripTypes(cache.get('facemasks')) || [],
    beanies: stripTypes(cache.get('beanies')) || []
  }
}

exports.getAll = getAll
