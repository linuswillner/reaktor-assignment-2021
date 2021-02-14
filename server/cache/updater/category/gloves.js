const formatCategoryData = require('../../../formatters/category')
const fetchUntilSuccess = require('./fetchUntilSuccess')

module.exports = async cache => {
  const gloves = await fetchUntilSuccess('/products/gloves')
  return formatCategoryData(gloves)
}
