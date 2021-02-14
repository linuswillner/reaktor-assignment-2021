const logUpdate = require('log-update')
const dedupe = require('dedupe')

module.exports = (allItems, availabilityData) => {
  const newItems = []

  let updated = 0
  let skipped = 0

  for (const availabilityItem of availabilityData) {
    // This is a bit inefficient, but checking with normal equality causes a loss of data in flight
    const itemToUpdate = allItems.find(item => item.id === availabilityItem.id)

    // Note: The availability API seems to mix in garbage data that can't be found at all in the global listing,
    // even when it's confirmed that no data loss occurs for any of the category fetches. Marking those
    // separately here for debugging purposes, but they will be discarded, as we can't really say
    // anything about a product that has no information attached to it (barring the notion of its stock).

    if (itemToUpdate) {
      // Update item
      itemToUpdate.isInStock = availabilityItem.isInStock
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
