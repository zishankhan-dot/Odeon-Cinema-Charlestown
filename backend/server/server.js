import express from 'express'
import dotenv from 'dotenv'
import * as fs from 'node:fs';
import userRouter from '../Routes/userRoute.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename);

dotenv.config({path:'./config.env'})



const PORT=process.env.PORT ;
const HOST='0.0.0.0';

const express_api=express();



//static files using express 
express_api.use(express.static(path.join(__dirname,'../../Frontend')));
//middleware
express_api.use(express.json());


//route to get data from user.html
/*
express_api.post('/user.html',(req,res)=>{
    console.log(req.body);
    const data=req.body;
    fs.readFile("./data/user.json",'utf-8',(err,olddata)=>{
        
    if(err){console.error(err)}
    else{
    let newdata=[]
    newdata=JSON.parse(olddata);
    newdata.push(data);
    fs.writeFile("./data/user.json",JSON.stringify(newdata,null,4),(err)=>{
        if(err){console.error(err)}
        else{
            console.log(newdata);
        }
    })
    } 
        
    
    
    
    
    });
   


})
*/


/// user userroute to 
express_api.use('/User',userRouter);


express_api.listen(PORT,HOST,(err)=>{
    console.log(`running at port : ${PORT}`);
    
})