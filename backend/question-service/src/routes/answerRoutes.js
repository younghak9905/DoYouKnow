const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

router
    .route('/')
    .post(answerController.createAnswer) // 새로운 답변 추가
    .get(answerController.getAnswers); // 모든 답변 조회

router
    .route('/:id')
    .get(answerController.getAnswerById) // 특정 답변 조회
    .put(answerController.updateAnswer) // 특정 답변 수정
    .delete(answerController.deleteAnswer); // 특정 답변 삭제
router
    .route('/question/:questionId')
    .get(answerController.getAnswerByQuestionId)
module.exports = router;
