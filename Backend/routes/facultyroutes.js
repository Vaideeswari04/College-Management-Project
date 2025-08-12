const express = require('express');
const router = express.Router();
const controller = require('../controllers/facultycontroller');

router.post('/addfaculty',controller.createFaculty)

module.exports = router;
