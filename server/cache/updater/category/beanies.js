const formatCategoryData = require('../../../formatters/category')
const fetchUntilSuccess = require('./fetchUntilSuccess')

module.exports = async cache => {
  const beanies = await fetchUntilSuccess('/products/beanies')
  return formatCategoryData(beanies)
}
