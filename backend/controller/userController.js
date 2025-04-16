import User from "../model/usermodel.js";
import Dotenv  from "dotenv";
import jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "node:fs"

//include config file
Dotenv.config({path:"./config.env"});
//using secret_token from env
const secretkey=process.env.SECRET_TOKEN;
//using pepper from env
const pepper=process.env.PEPPER;



//include admin array from filesystem
//parsing to return it as js object .. fs return it as string .. 
const admins=JSON.parse(fs.readFileSync("./data/admin.json","utf-8"));


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



//function to create jwt token (login) and send token back as cookie .. 
export const loginUser=async (req,res)=>{
   const {Email,Password}=req.body;
   if(!Email || !Password){return res.status(402).json({message:"Please input mail and password !!"})}

//checking if user is admin 
const Admin= await admins.find(element=>element.Email==Email);
if(Admin){
    
        //create token for admin and send response with role:admin
        const token =jwt.sign({
            Email:Email,
            Admin:true
        },secretkey,{expiresIn:'1h'});
        res.cookie("authorization",token,{maxAge:3600000})
       return res.status(200).json({
            message:"succesfully loged admin",
            role:"Admin"
        })
      
    };
// checking for user in User table 
   const isUser= await User.findOne({Email})
   if(!isUser){return res.status(402).json({message:"EMAIL NOT FOUND!!"})}
// pepper = some random string 
   const isPassword=await bcrypt.compare(pepper+Password,isUser.Password);
   if(!isPassword){return res.status(402).json({message:"PASSWORD INCORRECT!!"})}
   const token=jwt.sign({
    userId:isUser._id,
    Email:isUser.Email
   },secretkey,{expiresIn:"2h"});

   /// setting token to cookie ..
   res.cookie("authorization",token,{
    maxAge:3600000  // 60 mins 
   })
  return res.status(200).json({
    message:"login successful",
    role:"User"

   })
}


// Middleware to check token and also it shares the user_id to next middle ware 
export const checkTokenShareUserDetail=(req,res,next)=>{
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
//sending user detail to fronend .. Middleware
export const userDetail=(req,res,next)=>{
    const userId=req.userData.userId;
    const Email=req.userData.Email;
    console.log(userId,Email)
    next()
    
}