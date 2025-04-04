import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Dotenv from "dotenv";
Dotenv.config({path:"./config.env"})

const pepper=process.env.PEPPER
// call config file 
//connecting to local MongoDB
mongoose.connect("mongodb://localhost:27017/")
    .then(()=>console.log("connected successfully!!"));

//creating schema object
const Schema=mongoose.Schema;
const id=Schema.Types.ObjectId;
//creating schema
const userSchema=new Schema({
    userId:id,
    Name:{type:String,required:true},
    Email:{type: String,required: true, unique: true,match:/\.com$/},
    Password:{type: String,required: true},
    ConfirmPassword:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return this.Password===value;
            },
            message:"password dont match"
        }

    },
    createdAt:{type: Date,default:Date.now,immutable:true},
});
//middleware to not save the confirmpassword just for validation in frontend!!
userSchema.pre('save',function(next){
this.ConfirmPassword=undefined;
next();
})


// hashing password before saving it 
userSchema.pre('save',async function(next){
this.Password=await bcrypt.hash(pepper+this.Password,10);
console.log(pepper);
next();
})

//using created schema to model it 
const User=mongoose.model("User",userSchema);

//exporting User model 
export default User;





//test caseses :
/*
const newuser=new User({
    Email:"user@123.com",
    password:"helloHello",
}) 


newuser.save()
    .then(()=>{console.log("userSaved")})
    .catch((err)=>{console.log(err)})
*/
