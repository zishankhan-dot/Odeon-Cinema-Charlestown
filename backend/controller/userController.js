import User from "../model/usermodel.js";
import Dotenv  from "dotenv";
import jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";

//include config file
Dotenv.config({path:"./config.env"});
//using secret_token from env
const secretkey=process.env.SECRET_TOKEN;
//using pepper from env
const pepper=process.env.PEPPER;



//function to create new user 

export const createNewUser=async (req,res)=>{
    console.log(req.body);
    try{
    const {Name,Email,Password,ConfirmPassword}=req.body;
    if(!Email || !Password){res.status(402).json({message:"ERROR EMAIL AND PASSWORD REQUIRED"})}
    const existinguser= await   User.findOne({Email});
    if(existinguser){return res.status(409).json({message:"this user already exist"})}
    else if (!(Password === ConfirmPassword)){return res.status(402).json({message:"ERROR PASSWORD AND CONFIRM PASSWORD DONT MATCH !!"})}
    else{
        const newuser=new User({Name,Email,Password,ConfirmPassword});
        await newuser.save();
        res.status(200).json({message:"User created"});

    }
}
catch(error){
console.error(error);
}}


export const loginUser=async (req,res)=>{
   const {Email,Password}=req.body;
   if(!Email || !Password){return res.status(402).json({message:"Please input mail and password !!"})}
   const isUser= await User.findOne({Email})
   if(!isUser){return res.status(402).json({message:"EMAIL NOT FOUND!!"})}
   const isPassword=await bcrypt.compare(pepper+Password,isUser.Password);
   if(!isPassword){return res.status(402).json({message:"PASSWORD INCORRECT!!"})}
   const token=jwt.sign({
    userId:isUser._id,
    Email:isUser.Email
   },secretkey,{expiresIn:"2h"});

   /// setting token to cookie ..
   res.cookie("authorization",token,{
    maxAge:360000
   })
   res.status(200).json({
    message:"login successful",

   })
}


// Middleware to check token 
export const checkToken=(req,res,next)=>{
    const token=req.cookies.authorization;
    //checking cookie 
    console.log(req.cookies);
    if(!token){
        return res.status(402).json({message:"token not found , login again!!!!"})
    }
    try{
       const decode= jwt.verify(token,secretkey)
        req.userData=decode;
        console.log("successfull verification !!");
        next();
    
    }
    catch(error){
        console.log(error)
        return res.status(402).json({message:"failed token verification !! login again"})
         
         
    }
}

export const userDetail=(req,res,next)=>{
    const userId=req.userData.userId;
    console.log(userId)
    next()
    
}