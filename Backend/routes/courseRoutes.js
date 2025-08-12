const express = require('express');
const router = express.Router();
const controller = require('../controllers/cousrecontrollers');


router.post('/addcourse', controller.addCourse);

router.get('/viewcourse', controller.viewCourse);

router.get('/viewcourse/:id', controller.updatecourse);

router.put('/updateCourse/:id', controller.updateCourse);
router.delete('/:id', controller.deleteCourse)

module.exports = router;
