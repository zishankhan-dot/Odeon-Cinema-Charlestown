import User from "../model/usermodel.js";
import Cart from "../model/cartmodel.js";


//controller function to post into cart ..
export const cartItem=async (req,res,next)=>{
    const userId=req.userData.userId;
    const{MovieName,qty}=req.body;
    try {
        let cart = await Cart.findOne({userId})
        if(cart){
            let exisitingMovie= cart.items.find(item=>item.MovieName===MovieName);
            if(exisitingMovie){
                exisitingMovie.qty+=qty;
            }
            else{
                cart.items.push({MovieName,qty});
            }

        }
        else{
            cart =new Cart({
                userId,
                items:[{MovieName,qty}]
        });

        }

        await cart.save();
        console.log("cart updated successfully :",cart)
        next();
    }
    catch(err){
        console.log(err);
    }


}

//controller to retrieve all cart item for give user 
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