const mongoose=require("mongoose")
const UserSchema=new mongoose.Schema({
    name:String,
    email:{type:String,required:true},
    password:String,
   role: {type: String,enum: ["admin", "student", "faculty"],},
    createdArt:Date,
    token:String
})
module.exports=mongoose.model("User",UserSchema)