const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectname: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", 
    required: true,
    
  },
});

module.exports = mongoose.model("Subject", subjectSchema);
