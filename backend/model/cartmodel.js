import mongoose from "mongoose";
import User from "../model/usermodel.js"
//connecting to mongodb
mongoose.connect("mongodb://localhost:27017/").then(console.log("connected!!")).catch(err=>console.error(err));

let Schema=mongoose.Schema;

const cartschema=new Schema({
    userId:{type:Schema.Types.ObjectId,
        required:true,
        ref: User
    },
    items:[{
    MovieName:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true

    },
    Price:{
        type:Number,
        required:true

    }
    }]

});

const Cart=mongoose.model("cart",cartschema)

//exporting cart
 export  default Cart;
