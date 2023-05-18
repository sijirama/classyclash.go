import Express from "express"


import { env } from "./config/environment"


const app = Express()

//NOTE: middleware
app.use(Express.json())
app.use(Express.urlencoded({extended:false}))

//NOTE: routes
app.get("/PING" , (_req, res) => res.send("PONG"))


//NOTE: SERVER
app.listen(env.PORT, ()=>{
    console.clear()
    console.log("Server is running on port:",env.PORT)
})
