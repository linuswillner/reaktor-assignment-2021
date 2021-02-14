module.exports = categoryData => {
  return categoryData.map(item => delete item.type)
}
