const express = require('express');
const router = express.Router();
const {
    createStudent,
    assignMentorToStudent,
    getUnassignedStudents,
    changeStudentMentor,
    getStudentsByMentor,
    getPreviousMentors,
} = require('../controller/studentController');

router.post('/create', createStudent);
router.post('/assign', assignMentorToStudent);
router.get('/unassigned', getUnassignedStudents);
router.put('/change-mentor', changeStudentMentor);
router.get('/by-mentor/:mentorId', getStudentsByMentor);
router.get('/previous-mentors/:studentId', getPreviousMentors);

module.exports = router;
