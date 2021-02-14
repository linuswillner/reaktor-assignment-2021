const fetch = require('node-fetch')
const config = require('../../config.json')

module.exports = async url => {
  const response = await fetch(`${config.API_BASE_URL}${url}`)

  if (response.statusCode >= 400) {
    throw new Error(`Got status code >= 400: ${response.statusCode}`)
  }

  return response.json()
}
