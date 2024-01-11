const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionsController')

router.get('/', questionController.getQuestions)
router.get('/answerTypes', questionController.getAnswersTypes)
router.get('/vote/:q_id/:answer_id', questionController.getVotes)
router.post('/addQuestion', questionController.addQuestion)
router.post('/insert', questionController.insertAnswer)

module.exports = router