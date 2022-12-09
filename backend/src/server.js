const express = require('express')
const cors = require('cors')
const server = express()

// middlewares
server.use(cors())
server.use(express.json())

// routes
server.use('/allcitations', require('./routes/citation.route'))
// server.use('/new-citation', require('./routes/citation.route'))

module.exports = server