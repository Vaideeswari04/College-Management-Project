const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentcontroller');

router.post('/students',controller.createStudent);
router.get('/stud',controller.getStudents);
router.put('/stud/:id',controller.updateStudent);
router.get('/studs/:id',controller.getStudentById)
router.put('/stude',controller.updateStudent)

module.exports = router;
