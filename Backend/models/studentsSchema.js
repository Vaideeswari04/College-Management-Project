const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  rollnumber: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: Number, required: true },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }]
});

module.exports = mongoose.model('Student', StudentSchema);
