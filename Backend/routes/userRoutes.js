const express=require("express")
const {loginUser,createUser,getUsers, getFaculty, getStudent,getAdmin,getAdminById,getAdminByIdAndUpdate}=require('../controllers/usercontrollers')
const User=require('../models/userschemas')
const router=express.Router()
router.post("/register",createUser);
router.post('/login',loginUser)
router.get('/users/students',getStudent)
router.get('/users/faculty',getFaculty)
router.get('/admin',getAdmin)
router.get('/admin/:id',getAdminById)
router.put('/update/:id',getAdminByIdAndUpdate)
module.exports = router;