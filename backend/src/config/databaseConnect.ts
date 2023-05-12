
import mongoose from "mongoose";
import { env } from "./env";

export default async function databaseConnect(){
    try {
        await mongoose.connect(env.MONGO_URI!)
    } catch (error) {
        console.error("Unable to connect to mongo db")
    }
}
