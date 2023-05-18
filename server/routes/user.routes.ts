import {Router} from "express"
import * as UserController from "../controllers/user.controller"
import asyncHandler from "express-async-handler"
const router = Router()

router.get("/auth" , asyncHandler(UserController.authenticateUser))

export default router
