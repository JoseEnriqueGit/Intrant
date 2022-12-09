import dotenv from "dotenv"
dotenv.config();

export const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : "NO URI";