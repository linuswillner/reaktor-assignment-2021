const getJSON = require('../../../utils/getJSON')

module.exports = async path => {
  let attempts = 0

  const fetchUntilSuccess = async () => {
    const response = await getJSON(path)

    // Compensate for failure case where API returns empty data
    if (!response) {
      attempts = attempts++
      logger.error(`Fetching of ${path} failed (empty response) for attempt ${attempts}. Retrying...`)
      return fetchUntilSuccess()
    }

    return response
  }

  return fetchUntilSuccess()
}
