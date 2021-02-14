const dispatcher = require('../../utils/dispatcher')
const { getCategory, getAvailability } = require('./fetchTools')
const formatCategoryData = require('./formatters/category')
const formatStock = require('./formatters/stock')
const mergeAndSplit = require('./formatters/mergeAndSplit')
const interspliceAvailability = require('./formatters/intersplice')

/**
 * Performs a cache update.
 *
 * @param {Cache} cache A node-cache object
 */
module.exports = async cache => {
  logger.debug('Performing cache refresh.')

  // Start by getting category data; this way, we'll both get data
  // to the client sooner and get manufacturer data for the availability endpoint

  const manufacturers = []

  for (const category of ['gloves', 'facemasks', 'beanies']) {
    logger.debug(`Fetching item data for category ${category}.`)

    let response

    // Catch any errors that might bubble up from node-fetch
    try {
      response = await getCategory(`/products/${category}`)
    } catch (err) {
      logger.error(`Error when fetching item data for category ${category}: ${err.stack}`)
      dispatcher.emit('cache_update_error', err)
      break
    }

    logger.debug(`Fetching item data for category ${category} succeeded. Formatting.`)

    const formatted = formatCategoryData(response)
    // Don't strip types at this point, we'll need those later for availability data

    // Record all manufacturers for the availability endpoint
    formatted.forEach(item => {
      if (!manufacturers.includes(item.manufacturer)) {
        manufacturers.push(item.manufacturer)
      }
    })

    logger.debug(`Formatting item data for ${category} succeeded. Writing to cache.`)
    cache.set(category, formatted)
    logger.debug(`Cache write of item data for category ${category} succeeded.`)
  }

  // Next, let's index item availability for all manufacturers

  for (const manufacturer of manufacturers) {
    logger.debug(`Fetching availability data for manufacturer ${manufacturer}.`)

    let response

    // Catch any errors that might bubble up from node-fetch
    try {
      response = await getAvailability(`/availability/${manufacturer}`)
    } catch (err) {
      logger.error(`Error when fetching availability data for manufacturer ${manufacturer}: ${err.stack}`)
      dispatcher.emit('cache_update_error', err)
      break
    }

    logger.debug(`Fetching availability data for manufacturer ${manufacturer} succeeded. Formatting.`)

    const formatted = formatStock(response)

    // Merge all items together for availability intersplicing
    const allItems = mergeAndSplit.merge(['gloves', 'facemasks', 'beanies'].map(category => cache.get(category)))

    // Intersplice availability data
    const interspliced = interspliceAvailability(allItems, formatted)

    // Split the items per category again
    const parsed = mergeAndSplit.split(interspliced)

    logger.debug(`Formatting availability data for manufacturer ${manufacturer} succeeded. Writing to cache.`)

    for (const category in parsed) {
      cache.set(category, parsed[category])
    }

    logger.debug(`Cache write of availability data for manufacturer ${manufacturer} succeeded.`)
  }

  logger.debug('Cache refresh finished.')
}
