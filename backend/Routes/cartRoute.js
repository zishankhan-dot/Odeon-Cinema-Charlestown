import express, { Router } from 'express'
const cartRouter=express.Router();
//importing controllers to use as middleware
import {checkToken} from "../controller/userController.js";
//importing middleware from cartController.js
import { cartItem,retrieveItems } from "../controller/cartController.js";



//router to post cart...
  cartRouter.post("/post",checkToken,cartItem);
  cartRouter.get("/get",checkToken,retrieveItems)

  export default  cartRouter;