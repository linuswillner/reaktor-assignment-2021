const formatCategoryData = require('../../../formatters/category')
const fetchUntilSuccess = require('./fetchUntilSuccess')

module.exports = async cache => {
  const facemasks = await fetchUntilSuccess('/products/facemasks')
  return formatCategoryData(facemasks)
}
