import dotenv from "dotenv"

dotenv.config()

export const env = {
    PORT:process.env.PORT || 3500,
    MONGO_URI:process.env.MONGO_URI,
    NODE_ENVIRONMENT:process.env.NODE_ENV
}
