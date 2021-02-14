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

module.exports = availabilityData => {
  const newData = []

  for (const oldItem of availabilityData.response) {
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
