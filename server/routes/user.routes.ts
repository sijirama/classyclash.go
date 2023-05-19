import {Router} from "express"
import * as UserController from "../controllers/user.controller"
import asyncHandler from "express-async-handler"
const router = Router()

router.post("/" , asyncHandler(UserController.registerUser))
router.post("/auth" , asyncHandler(UserController.authenticateUser))
router.post("/logout" , asyncHandler(UserController.logoutUser))
router.get("/profile" , asyncHandler(UserController.getUser))
router.put("/profile" , asyncHandler(UserController.updateUser))

export default router
