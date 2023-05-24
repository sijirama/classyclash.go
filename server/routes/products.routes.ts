import {Router} from "express"
import * as ProductsController from "../controllers/products.controller"
import asyncHandler from "express-async-handler"
import {protect} from "../middleware/authMiddleware"
const router = Router()

//@ts-ignore
router.post("/saveproduct" , protect , asyncHandler( ProductsController.saveProducts ) )
//@ts-ignore
router.post("/unsaveproduct" , protect , asyncHandler( ProductsController.unsaveProducts ) )

export default router
