import Router from 'express';
import { createproduct, createuser, getproduct, Getuser, loginuser, refreshToken, updateproduct } from '../controllers/user_controller.js';
import {  Buyproducts, checkoutcart, createcart, getcart, removecart } from '../controllers/cart_controller.js';
import { authmiddleware } from '../middleware/user_middleware.js';


const userRouter = Router();


userRouter.post("/create-product",createproduct)
userRouter.post("/create-user",createuser)
userRouter.post("/login-user",loginuser)
userRouter.get("/get",authmiddleware,Getuser)
userRouter.get("/refresh",refreshToken)
userRouter.get("/get-product",authmiddleware,getproduct)
userRouter.post("/addtocart",authmiddleware,createcart)
userRouter.get("/get-cart",authmiddleware,getcart)
userRouter.delete("/delete/:Id",authmiddleware,removecart)
userRouter.patch("/update/:productId",authmiddleware,updateproduct)
userRouter.post("/checkout",authmiddleware,checkoutcart)
userRouter.get("/buy",authmiddleware,Buyproducts)


export default userRouter;