import cors from "cors";
import express from "express";
import postsRouters from "./routes/citationsRouters.js";

const server = express();

// middlewares
server.use(cors(), express.json());

// Routes
server.use(postsRouters);

const PORT = process.env.PORT || 4000;

async function runServer() {
	await server.listen(PORT);
	console.log(`Running in port ${PORT}`);
}

export default runServer;