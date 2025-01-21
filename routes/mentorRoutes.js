const express = require('express');
const router = express.Router();
const { createMentor, getAllMentors, getMentorById } = require('../controller/mentorController');

router.post('/create', createMentor);
router.get('/', getAllMentors);
router.get('/:id', getMentorById);


module.exports = router;
