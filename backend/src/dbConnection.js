import { connect } from "mongoose";
import { URI } from "./config.js";

export async function connectDb() {
    await connect(URI);
}

connectDb().catch((err) => console.log.o(err));