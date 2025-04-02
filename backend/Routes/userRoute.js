import express from 'express';
import { createNewUser, loginUser,checkToken,userDetail } from '../controller/userController.js';

const userRouter=express.Router();

userRouter.post('/new',createNewUser)
userRouter.post('/login',loginUser)
userRouter.get('/cart',checkToken,userDetail,(req,res)=>{
    res.status(200).json({message:"successfully in cart page .. "})
})

export default userRouter;