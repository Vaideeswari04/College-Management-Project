const Student=require('../models/studentsSchema')



exports.createStudent=async(req,res)=>{
    try{
        const student=new Student(req.body);
        const saved=await student.save();
        res.status(201).json(saved);
    }catch(err){
        res.status(400).json({error:err.message});
    }
};



exports.getStudents=async(req,res)=>{
    try{
        const students=await Student.find();
        res.json(students);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};



exports.getStudentById=async(req,res)=>{
    try{
        const stuId=await Student.findById(req.params.id);
        res.json(stuId);
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

exports.updateStudent=async(req,res)=>{
    try{
        const update=await Student.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!update){
            return res.status(404).json({error:'student not found'});
        }
        res.json(update);
    }catch(err){
        res.json(400).json({error:err.message})
    }
}