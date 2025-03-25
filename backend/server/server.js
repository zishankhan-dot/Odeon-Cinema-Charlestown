import express from 'express'
import dotenv from 'dotenv'
dotenv.config({path:'./config.env'})



const PORT=process.env.PORT;

const express_api=express();



//static files using express 
express_api.use(express.static('./Frontend'));

express_api.get('/user',(req,res)=>{

})


express_api.listen(PORT,(err)=>{
    console.log(`running at port : ${PORT}`);
    
})