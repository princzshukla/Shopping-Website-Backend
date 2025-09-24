import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    productREGISTER ,
    getPRODUCT ,

 } from "../controller/product.controllers.js";

 import { requiredROLE } from "../middlewares/roles.middleware.js";

 const router = Router()
//public route jisko krna hai kr lo access
//access krne ke liye /api/v1/product/list or add
router.route("/list").get(getPRODUCT)

 // pvt route matlb only seller role wale access krege
 router.route("/add").post( requiredROLE("seller") , verifyJWT ,productREGISTER)

 export default router