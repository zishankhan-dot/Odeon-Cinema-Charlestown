import express, { Router } from 'express'
const cartRouter=express.Router();
//importing controllers to use as middleware
import {checkTokenShareUserDetail} from "../controller/userController.js";
//importing middleware from cartController.js
import { cartItem,retrieveItems,patchmovie,deletemovie } from "../controller/cartController.js";



//router to post cart...
  cartRouter.post("/post",checkTokenShareUserDetail,cartItem);
  cartRouter.get("/get",checkTokenShareUserDetail,retrieveItems)
  cartRouter.patch("/patch",checkTokenShareUserDetail,patchmovie);
  cartRouter.delete("/delete",checkTokenShareUserDetail,deletemovie)

  export default  cartRouter;