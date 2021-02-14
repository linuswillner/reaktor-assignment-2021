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
updateCache(cache)

cache.on('set', (key, value) => {
  dispatcher.emit('cache_update_available', { category: key, data: value })
})

cache.on('expired', () => {
  dispatcher.emit('cache_expired')
  updateCache()
})

function getAll () {
  const gloves = cache.get('gloves')
  const facemasks = cache.get('facemasks')
  const beanies = cache.get('beanies')

  // Strip the types in case the formatter hasn't gotten
  // availability data yet and they're still there
  return {
    gloves: gloves ? stripTypes(gloves) : [],
    facemasks: facemasks ? stripTypes(facemasks) : [],
    beanies: beanies ? stripTypes(beanies) : []
  }
}

exports.getAll = getAll
