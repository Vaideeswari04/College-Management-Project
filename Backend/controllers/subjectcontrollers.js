
const Subject = require('../models/subjectschema');


exports.createSubject = async (req, res) => {
  try {
    const addsub = new Subject(req.body);
    console.log("hi", addsub); 
    await addsub.save();

    res.status(200).json({ message: "subject added" });
  } catch (error) {
    console.log("subject control error", error);
  }
};

exports.viewSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find(); 
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
};



exports.getSubjectsByFacultyId = async (req, res) => {
  try {
    const facultyId = req.params.facultyId;

    const subjects = await Subject.find({ facultyId: facultyId });

    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getSubjectsByCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const subjects = await Subject.find({ courseId: courseId });

    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 exports.updatesubject=async(req,res)=>{
  try{
    const updsubject=await Subject.findByIdAndUpdate(req.params.id,req.body)
  }catch(err){
    res.status(500).json({error:err.message})
  }
 }
 
