const express = require("express");
const router = express.Router();
const controller = require('../controllers/subjectcontrollers');

router.post('/subject', controller.createSubject);
router.get('/sub',controller.viewSubjects)
router.get('/course/:id',controller.getSubjectsByCourse)
router.put('/update/:id',controller.updatesubject)



module.exports = router;
