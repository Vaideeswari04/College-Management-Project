const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();


const UserRoutes = require("./routes/userRoutes");
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes=require('./routes/studentRoutes')
const subjectRoutes=require('./routes/subjectRoutes')
const facultyRoutes=require('./routes/facultyroutes')
const app = express();

app.use(express.json());         
app.use(require('cors')());

mongoose.connect("mongodb://localhost:27017/userdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use('/auth', UserRoutes);
app.use('/api/courses', courseRoutes); 
app.use('/api',studentRoutes)
app.use('/api',subjectRoutes)
app.use('/api',facultyRoutes)



app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});
