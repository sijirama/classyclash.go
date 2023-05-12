import Express from "express"
import { env } from "./config/env"
import cookieParser from "cookie-parser"
import cors from "cors"
import { corsOption } from "./config/corsOption"
import databaseConnect from "./config/databaseConnect"
import mongoose from "mongoose"

//NOTE: init
const app = Express()
databaseConnect()

//NOTE: Middleware
app.use(cors(corsOption))
app.use(Express.json())
app.use(cookieParser())
app.use(Express.urlencoded({extended:false}))

//NOTE: healthCheck
app.get("/PING" , (_req,res) => {res.send("PONG")})








//NOTE: check mongo
mongoose.connection.once("open" , () => {

//NOTE: app initialization!!! 
    app.listen(env.PORT , () => {
        console.clear()
        console.log(env.NODE_ENVIRONMENT)
        console.log("Server is listening at PORT: " , env.PORT ,"...")
    })
})


