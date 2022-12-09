// require('./dbConnection')
// const server = require('./server')

import { connectDb } from "./dbConnection.js";
import express from "express";
import postsRouters from "./routes/post.routes.js";

const server = express();

server.use(postsRouters);

const PORT = process.env.PORT || 4000;

async function runServer() {
	await server.listen(PORT);
	console.log(`Running in port ${PORT}`);
}
runServer();
connectDb();