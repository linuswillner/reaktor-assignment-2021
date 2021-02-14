/**
 * Parser for the DATAPAYLOAD field provided by the /availability/:manufacturer endpoint
 *
 * @param {String} value
 * @returns {Boolean | String} True/false for in stock, or "low" if less than 10 items are in stock
 */
const getStockAvailability = value => {
  // The relevant part of the data payload is in the INSTOCKVALUE field,
  // the value of which is enclosed in the first capture group here
  const inStockValue = /<INSTOCKVALUE>(\w+)<\/INSTOCKVALUE>/i.exec(value)[1]

  switch (inStockValue) {
    case 'INSTOCK':
      return true
    case 'OUTOFSTOCK':
      return false
    case 'LESSTHAN10':
      return 'low'
  }
}

/**
 * Formatter for raw data from the /availability/:manufacturer endpoint
 *
 * @param {Object} stockResponse Response from GET /availability/manufacturer
 * @returns {Array<Stock>} [ { id: String, isInStock: Boolean | String }, ... ]
 */
module.exports = stockResponse => {
  const newData = []

  for (const oldItem of stockResponse.response) {
    const newItem = {}

    for (const prop in oldItem) {
      switch (prop) {
        case 'id': // Normalise IDs to lowercase
          newItem.id = oldItem.id.toLowerCase()
          break
        case 'DATAPAYLOAD': // Parse out the relevant data from the DATAPAYLOAD field
          newItem.isInStock = getStockAvailability(oldItem.DATAPAYLOAD)
          break
        // There should be no other fields, and even if there are,
        // we don't care about them, so discard those
      }
    }

    newData.push(newItem)
  }

  return newData
}
