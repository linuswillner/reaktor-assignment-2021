/**
 * Merges an array of category data objects into a single array.
 *
 * @param {Array<Object>} allItemCategories [ Gloves, Facemasks, Beanies ]
 * @returns {Array<Item>} Array containing all known items
 */
exports.merge = allItemCategories => {
  const allItems = []
  allItemCategories.forEach(itemsInCategory => allItems.push(itemsInCategory))
  return allItems.flat()
}

/**
 * Splits an array of all items on record into an object based on item type.
 *
 * @param {Array<Item>} allItems [ ...Gloves, ...Facemasks, ...Beanies ]
 * @returns {Object} { gloves: Array<Item>, facemasks: Array<Item>, beanies: Array<Item> }
 */
exports.split = allItems => {
  return {
    gloves: allItems.filter(item => item.type === 'gloves'),
    facemasks: allItems.filter(item => item.type === 'facemasks'),
    beanies: allItems.filter(item => item.type === 'beanies')
  }
}
