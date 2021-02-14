module.exports = categoryData => {
  categoryData.forEach(item => delete item.type)
  return categoryData
}
