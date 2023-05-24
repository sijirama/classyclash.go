import Express from "express"
import path from "path"
import UserRouter from "./routes/user.routes"
import ProductRouter from "./routes/products.routes"
import * as ErrorMiddleware from "./middleware/errorHandler"
import cookieParser from "cookie-parser"

import { env } from "./config/environment"
import { connectToMongo } from "./config/mongo"
import mongoose from "mongoose"

const app = Express()
connectToMongo()

//NOTE: middleware
app.use(cookieParser())
app.use(Express.json())
app.use(Express.urlencoded({extended:false}))

//NOTE: Deployment
if(env.NODE_ENV === 'production'){
    const __dirname = path.resolve()
    app.use(Express.static(path.join(__dirname , "client/dist")))
    app.get("*" , (req, res) =>{
        res.sendFile(path.resolve(__dirname , "client" , "dist" , "index.html"))
    })
}

//NOTE: routes
app.get("/PING" , (_req, res) => res.send("PONG"))
app.use("/api/user" , UserRouter)
app.use("/api/products" , ProductRouter)

//NOTE: middleware that needs to be after routes
app.use(ErrorMiddleware.notFound)
app.use(ErrorMiddleware.errorHandler)

//NOTE: SERVER
mongoose.connection.once("open", () =>{
    app.listen(env.PORT, ()=>{
        console.clear()
        console.log("Server is running on port:",env.PORT)
    })
})
