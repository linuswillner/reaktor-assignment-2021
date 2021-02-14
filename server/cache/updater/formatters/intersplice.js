module.exports = (allItems, availabilityData) => {
  const newItems = []

  for (const item in allItems) {
    const newItem = item
    const stockForItem = availabilityData.find(item => item.id === newItem.id)

    if (!stockForItem) {
      logger.error(`Stock availability data for item ${newItem.id} not found!`)
    } else { // Merge the objects
      Object.assign(newItem, stockForItem)
    }

    allItems.push(newItem)
  }

  return newItems
}
