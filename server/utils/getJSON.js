const fetch = require('node-fetch')
const config = require('../../config.json')

module.exports = async url => {
  const response = await fetch(`${config.API_BASE_URL}${url}`)
  return response.json()
}
