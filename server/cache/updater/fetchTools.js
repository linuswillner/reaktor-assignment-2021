const getJSON = require('../../utils/getJSON')

/**
 * Perform a GET request to /products/:category.
 *
 * This function will indefinitely attempt to obtain correct data
 * until it succeeds, and relies on the OS to sleep the process if
 * it's not in use to avoid spamming the API.
 *
 * @param {String} category
 */
exports.getCategory = async category => {
  let attempts = 0

  const fetchUntilSuccess = async () => {
    const response = await getJSON(category)

    // Compensate for failure case where API returns ""
    if (!response) {
      attempts = ++attempts
      logger.error(`Fetching of ${category} failed (empty response) for attempt ${attempts}. Retrying...`)
      return fetchUntilSuccess()
    }

    return response
  }

  return fetchUntilSuccess()
}

/**
 * Perform a GET request to /availability/:manufacturer.
 *
 * This function will indefinitely attempt to obtain correct data
 * until it succeeds, and relies on the OS to sleep the process if
 * it's not in use to avoid spamming the API.
 *
 * @param {String} manufacturer
 */
exports.getAvailability = async manufacturer => {
  let attempts = 0

  const fetchUntilSuccess = async () => {
    const response = await getJSON(manufacturer)

    // Compensate for failure case where API returns { "code": 200, "response": "[]" }
    if (!Array.isArray(response?.response)) {
      attempts = ++attempts
      logger.error(`Fetching of ${manufacturer} failed (invalid data in response field) for attempt ${attempts}. Retrying...`)
      return fetchUntilSuccess()
    }

    return response
  }

  return fetchUntilSuccess()
}
