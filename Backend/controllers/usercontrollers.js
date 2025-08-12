const User = require('../models/userschemas');
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    console.log("incoming",req.body)
    const { name, email, password, role } = req.body;
    const extuser = await User.findOne({ email });

    if (extuser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashed,
      role,
    });

    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login Request:", req.body);

    const loguser = await User.findOne({ email });

    if (!loguser) {
      return res.status(400).json({ error: 'Email not registered' });
    }

   
    console.log("Entered password:", password);
    console.log("Stored hash:", loguser.password);

    const match = await bcrypt.compare(password, loguser.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid Password' });
    }

    return res.status(200).json({ 
      message: 'Login successful',
      role: loguser.role 
    });

  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
 
  
};
exports.getStudent = async (req, res) => {
try {
const users = await User.find({role:"student"});
res.json(users);
} catch (err) {
res.status(500).json({ error: err.message });
}
};
exports.getFaculty = async (req, res) => {
try {
const users = await User.find({role:"faculty"});
res.json(users);
} catch (err) {
res.status(500).json({ error: err.message });
}
};
exports.getAdmin=async(req,res)=>{
  try{
    const admin=await User.find({role:"admin"})
    res.json(admin)
  }catch(err){
    res.status(500).json({error:err.message})
  }
}
exports.getAdminById=async(req,res)=>{
  try{
    const updateAdmin=await User.findById(req.params.id)
    res.json(updateAdmin)
  }catch(err){
    res.status(500).json({error:err.message})
  }
}
exports.getAdminByIdAndUpdate=async(req,res)=>{
  try{
    const UpdAdmin=await User.findByIdAndUpdate(req.params.id,req.body)
  res.json(UpdAdmin)
  }catch(err){
    res.status(500).json({error:err.message})
  }
}