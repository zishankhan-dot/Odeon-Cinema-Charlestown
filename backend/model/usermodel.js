import mongoose from "mongoose";
//connecting to local MongoDB
mongoose.connect("mongodb://localhost:27017/")
    .then(()=>console.log("connected successfully!!"));

//creating schema object
const Schema=mongoose.Schema;
const id=Schema.Types.ObjectId;
//creating schema
const userSchema=new Schema({
    userId:id,
    Email:{type: String,required: true, unique: true},
    password:{type: String,required: true},
    createdAt:{type: Date,default:Date.now,immutable:true},
});
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
