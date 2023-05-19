import dotenv from "dotenv"
dotenv.config()

export const env = {
    PORT: process.env.PORT || 3500,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV
}
