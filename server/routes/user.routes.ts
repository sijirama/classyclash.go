import {Router} from "express"
import * as UserController from "../controllers/user.controller"
const router = Router()

router.get("/auth" , UserController.authenticateUser)

export default router
