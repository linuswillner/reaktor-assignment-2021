// Note: Both args need to be flat arrays
module.exports = (allCategories, allManufacturers) => {
  const allItems = []

  for (const item in allCategories) {
    const newItem = item
    const stockForItem = allManufacturers.find(item => item.id === newItem.id)

    if (!stockForItem) {
      logger.error(`Stock availability data for item ${newItem.id} not found!`)
    } else { // Merge the objects
      Object.assign(newItem, stockForItem)
    }

    allItems.push(newItem)
  }

  return allItems
}
