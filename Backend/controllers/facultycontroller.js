const Faculty = require('../models/facultyschema');

exports.createFaculty = async (req, res) => {
  try {
    console.log("Incoming Faculty Data:", req.body);

    const newFaculty = new Faculty(req.body);
    await newFaculty.save();

    res.status(201).json({ message: "Faculty created" });
  } catch (err) {
    console.error("Error creating faculty:", err.message);  
    res.status(500).json({ error: err.message });
  }
};
