// require('./dbConnection')
// const server = require('./server')

import { connectDb } from "./dbConnection.js";
import server from "./server.js";

const PORT = process.env.PORT || 4000;

async function runServer() {
	await server.listen(PORT);
	console.log(`Running in port ${PORT}`);
}
runServer();
connectDb();