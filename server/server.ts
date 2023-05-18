import Express from "express"
import UserRouter from "./routes/user.routes"


import { env } from "./config/environment"


const app = Express()

//NOTE: middleware
app.use(Express.json())
app.use(Express.urlencoded({extended:false}))

//NOTE: routes
app.get("/PING" , (_req, res) => res.send("PONG"))
app.use("/api/user" , UserRouter)

//NOTE: SERVER
app.listen(env.PORT, ()=>{
    console.clear()
    console.log("Server is running on port:",env.PORT)
})
