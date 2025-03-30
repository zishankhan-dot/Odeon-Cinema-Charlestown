import express from 'express';
import { createNewUser } from '../controller/userController.js';

const userRouter=express.Router();

userRouter.post('/new',createNewUser)

export default userRouter;