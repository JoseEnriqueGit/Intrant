import { connect } from "mongoose";
import { URI } from "./config.js";

export async function connectDb() {
    console.log("DB Connect");
}

connectDb().catch((err) => console.log.o(err));