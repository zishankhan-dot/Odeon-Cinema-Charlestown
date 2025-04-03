import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createNewUser, loginUser,checkToken,userDetail } from '../controller/userController.js';


const userRouter=express.Router();
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename);


userRouter.post('/new',createNewUser)
userRouter.post('/login',loginUser)
userRouter.get('/cart.html',checkToken,userDetail,(req,res)=>{
    res.sendFile(path.join(__dirname,'../../Frontend','cart.html'))
})

export default userRouter;