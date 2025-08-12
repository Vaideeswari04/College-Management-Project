const Course = require('../models/courseschema');


exports.addCourse = async (req, res) => {
  try {
    const { cname, cduration, cdepartment } = req.body;
    const newCourse = new Course({ cname, cduration, cdepartment });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error("Add error:", err);
    res.status(400).json({ error: err.message });
  }
};


exports.viewCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updatecourse = async (req, res) => {
  try {
  
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error("Fetch by ID error:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.updateCourse = async (req, res) => {
  try {
   

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id,req.body,{new:true})

    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(updatedCourse);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: err.message });
  }
};



exports.deleteCourse = async (req, res) => {
  try {
    
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting course' });
  }
};
