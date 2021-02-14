/**
 * Formatter for raw data from the /products/:category endpoint
 *
 * @param {Object} categoryResponse Response from GET /products/:category
 * @returns {Array<Item>} [ { id: String, type: String, name: String, colors: Array<String>, price: Number, manufacturer: String }, ... ]
 */
module.exports = categoryResponse => {
  const newData = []

  for (const oldItem of categoryResponse) {
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
