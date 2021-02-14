const getJSON = require('../../../utils/getJSON')

module.exports = async path => {
  let attempts = 0

  const fetchUntilSuccess = async () => {
    const response = await getJSON(path)

    // Compensate for failure case where API returns { "code": 200, "response": "[]" }
    if (!Array.isArray(response?.response)) {
      attempts = attempts++
      logger.error(`Fetching of ${path} failed (invalid data in response field) for attempt ${attempts}. Retrying...`)
      return fetchUntilSuccess()
    }

    return response
  }

  return fetchUntilSuccess()
}
