import express from 'express';
import { createNewUser, loginUser,checkToken,userDetail } from '../controller/userController.js';

const userRouter=express.Router();

userRouter.post('/new',createNewUser)
userRouter.post('/login',loginUser)
userRouter.post('/cart',checkToken,userDetail)

export default userRouter;