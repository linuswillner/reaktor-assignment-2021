const logUpdate = require('log-update')
const dedupe = require('dedupe')

/**
 * Formatter for intersplicing product and stock availability data.
 *
 * @param {Array<Item>} allItems Array of all products on record (Merged results from category.js)
 * @param {Array<Stock>} stockData Array of all stock availability data (Result from availability.js)
 * @returns {Array<Item>} [ { ...Category, ...Stock }, ... ]
 */
module.exports = (allItems, stockData) => {
  const newItems = []

  let updated = 0
  let skipped = 0

  for (const stockForItem of stockData) {
    // This is a bit inefficient, but transforming these into an object causes unexplainable in-flight data loss
    const itemToUpdate = allItems.find(item => item.id === stockForItem.id)

    // Note: The stock availability API appears to be mixing in garbage data that can't be found at all from
    // /products, even when it's confirmed that no data loss occurs for any of the category fetches. Marking
    // those separately here for debugging purposes, but they will be discarded, as we can't really say
    // anything about a product that has no information attached to it (barring the notion of its stock).

    if (itemToUpdate) {
      // Update item
      itemToUpdate.isInStock = stockForItem.isInStock
      newItems.push(itemToUpdate)
      updated = ++updated
    } else {
      skipped = ++skipped
    }

    logUpdate(`Updated ${updated} items. Skipped ${skipped} items.`)
  }

  logUpdate.done()

  return dedupe([...allItems, ...newItems], item => item.id)
}
