import User from "../model/usermodel.js";


//function to create new user 

export const createNewUser=(req,res)=>{
    const {Email, password}=req.body;
    if(!Email || !password){res.status(402).json({message:"ERROR EMAIL AND PASSWORD REQUIRED"})}
    else{
        const newuser=new User({Email,password});
        newuser.save();
        res.status(200).json({message:"User created"});

    }
}

