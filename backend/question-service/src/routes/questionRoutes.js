const express = require('express');
const router = express.Router();
const {
    getQuestions,
    getQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion
} = require('../controllers/questionController');

router.get('/', getQuestions);
router.get('/:id', getQuestionById);
router.post('/', createQuestion);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

module.exports = router;
