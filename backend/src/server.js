import cors from "cors";
import express from "express";
import postsRouters from "./routes/citationsRouters.js";

const server = express();

// middlewares
// server.use(cors())

server.use(cors({
    origin: 'http://localhost:4000'
    
  }));

server.use(express.json())

// Routes
server.use(postsRouters);

export default server;