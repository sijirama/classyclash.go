import Express from "express"
import { env } from "./config/env"
import cookieParser from "cookie-parser"

//NOTE: express init
const app = Express()

//NOTE: Middleware
app.use(Express.json())
app.use(cookieParser())
app.use(Express.urlencoded({extended:false}))

//NOTE: healthCheck
app.get("/PING" , (_req,res) => {res.send("PONG")})


//NOTE: app initialization!!! 
app.listen(env.PORT , () => {
    console.log("Server is listening at PORT: " , env.PORT ,"...")
})


