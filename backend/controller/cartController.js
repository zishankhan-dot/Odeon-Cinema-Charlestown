import User from "../model/usermodel.js";
import Cart from "../model/cartmodel.js";
import { response } from "express";


//controller function to post into cart ..
export const cartItem=async (req,res)=>{
    const userId=req.userData.userId;
    const{MovieName,qty,Price}=req.body;
    try {
        let cart = await Cart.findOne({userId})
        if(cart){
            let exisitingMovie= cart.items.find(item=>item.MovieName===MovieName);
            if(exisitingMovie){
                exisitingMovie.qty+=qty;
            }
            else{
                cart.items.push({MovieName,qty,Price});
            }

        }
        else{
            cart =new Cart({
                userId,
                items:[{MovieName,qty,Price}]
        });

        }

        await cart.save();
        console.log("cart updated successfully :",cart)
        res.status(200).json({message:"succesfully inserted"})
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:"failed!! "})
    }


}

//controller to retrieve all cart item for given user 
export const retrieveItems=async(req,res)=>{
    const userId=req.userData.userId;
    const cart= await Cart.findOne({userId});
    if(cart){
      res.status(200).json({
        cart:cart.items
      })
      console.log(cart.items)
    }
    else{
        res.status(400).json({
        message:"cart not found || user not found !!"
        })
    }
}

// middleware to retrieve req data and {patch} it into cart table 
export const patchmovie=async(req,res)=>{
   try{
    const userId=await req.userData.userId;
    console.log(userId)
    const cart=await Cart.findOne({userId});
    const {qty,name}=await req.body;
    if(cart){
      const existing=  cart.items.find(item=>item.MovieName===name)
      console.log(existing)
      if(existing){
        existing.qty=qty;
        await cart.save()
        res.status(200).json({message:"updated !!"})
      }
      else{
        res.status(400).json({message:"some error"})
      }
    }
    else{
        res.status(400).json({message:"some error 2"})
    }
   }
   catch(err){
    console.error(err)
   }

   
   
}


// middleware to delete movies from cart  
export const deletemovie=async(req,res)=>{
    try{
     const userId=await req.userData.userId;
     console.log(userId)
     const cart=await Cart.findOne({userId});
     const {name}=await req.body;
     if(cart){
       const existing=  cart.items.find(item=>item.MovieName===name)
     //  console.log(existing)
       if(existing){
         existing.deleteOne();
         await cart.save()
         res.status(200).json({message:"deleted !!"})
       }
       else{
         res.status(400).json({message:"some error"})
       }
     }
     else{
         res.status(400).json({message:"some error 2"})
     }
    }
    catch(err){
     console.error(err)
    }
 
    
    
 }