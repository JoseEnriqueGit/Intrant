// require('dotenv').config()
// require('./dbConnection')
// const server = require('./server')
// PORT
const PORT = process.env.PORT || 3001

async function runServer () {
	// await server.listen(PORT)
    
	await server.listen(PORT)
	console.log(`Running in port ${PORT}`)
}
runServer()