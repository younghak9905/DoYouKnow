const Question = require('../models/questionModel');

// 모든 질문 조회
exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 특정 질문 조회
exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 새로운 질문 추가
exports.createQuestion = async (req, res) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.status(201).json(question);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 특정 질문 업데이트
exports.updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 특정 질문 삭제
exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
