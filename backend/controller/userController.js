import User from "../model/usermodel.js";


//function to create new user 

export const createNewUser=async (req,res)=>{
    try{
    const {Name,Email,Password,ConfirmPassword}=req.body;
    if(!Email || !Password){res.status(402).json({message:"ERROR EMAIL AND PASSWORD REQUIRED"})}
    const existinguser= await   User.findOne({Email});
    if(existinguser){return res.status(409).json({message:"this user already exist"})}
    else{
        const newuser=new User({Name,Email,Password,ConfirmPassword});
        await newuser.save();
        res.status(200).json({message:"User created"});

    }
}
catch(error){
console.error(error);
}}

