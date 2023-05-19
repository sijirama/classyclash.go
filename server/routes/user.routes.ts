import {Router} from "express"
import * as UserController from "../controllers/user.controller"
import asyncHandler from "express-async-handler"
const router = Router()

router.post("/auth" , asyncHandler(UserController.authenticateUser))
router.post("/" , asyncHandler(UserController.registerUser))

export default router
