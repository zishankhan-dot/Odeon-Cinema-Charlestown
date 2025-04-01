import express from 'express';
import { createNewUser, loginUser } from '../controller/userController.js';

const userRouter=express.Router();

userRouter.post('/new',createNewUser)
userRouter.post('/login',loginUser)

export default userRouter;