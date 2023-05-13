import {Router , Response , Request} from "express"
import * as UserController from "../controllers/user.controller"

export const AuthRouter = Router()

AuthRouter.route("/")
    .get(UserController.getAllUsers)
    .post(UserController.createNewUser)
    .patch(UserController.updateUser)
    .delete(UserController.deleteUser)
