const getJSON = require('../../utils/getJSON')

exports.getCategory = async category => {
  let attempts = 0

  const fetchUntilSuccess = async () => {
    const response = await getJSON(category)

    // Compensate for failure case where API returns empty data
    if (!response) {
      attempts = attempts++
      logger.error(`Fetching of ${category} failed (empty response) for attempt ${attempts}. Retrying...`)
      return fetchUntilSuccess()
    }

    return response
  }

  return fetchUntilSuccess()
}

exports.getAvailability = async manufacturer => {
  let attempts = 0

  const fetchUntilSuccess = async () => {
    const response = await getJSON(manufacturer)

    // Compensate for failure case where API returns { "code": 200, "response": "[]" }
    if (!Array.isArray(response?.response)) {
      attempts = attempts++
      logger.error(`Fetching of ${manufacturer} failed (invalid data in response field) for attempt ${attempts}. Retrying...`)
      return fetchUntilSuccess()
    }

    return response
  }

  return fetchUntilSuccess()
}
