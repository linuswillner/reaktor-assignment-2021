module.exports = categoryData => {
  const newData = []

  for (const oldItem of categoryData) {
    const newItem = {}

    for (const prop in oldItem) {
      switch (prop) {
        case 'color': // Rename color => colors for clarity
          newItem.colors = oldItem.color
          break
        default: // For all others, just copy 1:1
          newItem[prop] = oldItem[prop]
      }
    }

    // Add provisory in stock value
    newItem.isInStock = 'unknown'

    newData.push(newItem)
  }

  return newData
}
