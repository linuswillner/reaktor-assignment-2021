/**
 * Strips the type field from all items in a category.
 *
 * This function is used primarily when sending data to the client,
 * as the client does not utilise this field, and this helps to cut down on
 * the already rather sizey request body.
 *
 * @param {Array<Item>} categoryData Array of items in a given category
 */
module.exports = categoryData => {
  categoryData.forEach(item => delete item.type)
  return categoryData
}
