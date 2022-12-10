// const cors = require('cors')



import express from "express";
import postsRouters from "./routes/citationsRouters.js";

const server = express();

// middlewares
// server.use(cors())
server.use(express.json())

server.use(postsRouters);

export default server;