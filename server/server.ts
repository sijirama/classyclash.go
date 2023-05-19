import Express from "express"
import UserRouter from "./routes/user.routes"
import * as ErrorMiddleware from "./middleware/errorHandler"


import { env } from "./config/environment"
import { connectToMongo } from "./config/mongo"
import mongoose from "mongoose"


const app = Express()
connectToMongo()

//NOTE: middleware
app.use(Express.json())
app.use(Express.urlencoded({extended:false}))

//NOTE: routes
app.get("/PING" , (_req, res) => res.send("PONG"))
app.use("/api/user" , UserRouter)

//NOTE: middleware that needs to be after routes
app.use(ErrorMiddleware.notFound)
app.use(ErrorMiddleware.errorHandler)


//NOTE: SERVER
mongoose.connection.once("open", () =>{
    app.listen(env.PORT, ()=>{
        //console.clear()
        console.log("Server is running on port:",env.PORT)
    })
})
