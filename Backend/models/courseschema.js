const mongoose=require("mongoose")
const CourseSchemas=new mongoose.Schema({
    cname:String,
    cduration:String,
    cdepartment:String
})
module.exports=mongoose.model("Course",CourseSchemas)