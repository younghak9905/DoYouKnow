const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// 라우트 정의
router
    .route('/')
    .get(questionController.getQuestions) // 모든 질문 조회
    .post(questionController.createQuestion); // 새로운 질문 추가

router
    .route('/:id')
    .get(questionController.getQuestionById) // 특정 질문 조회
    .put(questionController.updateQuestion) // 특정 질문 수정
    .delete(questionController.deleteQuestion); // 특정 질문 삭제

module.exports = router;
