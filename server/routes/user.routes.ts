import {Router} from "express"
import * as UserController from "../controllers/user.controller"
import asyncHandler from "express-async-handler"
import {protect} from "../middleware/authMiddleware"
const router = Router()

router.post("/" , asyncHandler(UserController.registerUser))
router.post("/auth" , asyncHandler(UserController.authenticateUser))
router.post("/logout" , asyncHandler(UserController.logoutUser))
router.get("/profile" , protect , asyncHandler(UserController.getUser))
router.put("/profile" , protect ,asyncHandler(UserController.updateUser))

export default router
