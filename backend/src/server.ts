import Express from "express"
import { env } from "./config/env"

const app = Express()



app.listen(env.PORT , () => {
    console.log("Server is listening at PORT: " , env.PORT ,"...")
})


