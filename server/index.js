require('./utils/logger') // Initiate global logger

const express = require('express')
const api = require('./routes/api')

const app = express()
const port = process.env.PORT || 8000 // Heroku provides the port via env

// Mount middleware
app.use(require('helmet')())
app.use(express.static('public'))
app.use('/api/v1', api)

app.listen(port, () => {
  logger.info(`App listening on port ${port}`)
})
