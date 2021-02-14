require('./utils/logger') // Initiate global logger

const http = require('http')
const express = require('express')
const { registerIOEvents } = require('./ws')

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 5000 // Heroku provides the port via env

// Mount middleware
app.use(require('helmet')())

app.use(express.static('public'))

registerIOEvents(io)

server.listen(port, '127.0.0.1', () => {
  logger.info(`Server listening on port ${port}`)
})
