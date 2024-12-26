const Answer = require('../models/answerModel');

// 모든 답변 조회
exports.getAnswers = async (req, res) => {
    try {
        const answers = await Answer.find().populate('questionId', 'title');
        res.status(200).json(answers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 특정 답변 조회
exports.getAnswerById = async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id).populate('questionId', 'title');
        if (!answer) return res.status(404).json({ message: 'Answer not found' });
        res.status(200).json(answer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 새로운 답변 추가
exports.createAnswer = async (req, res) => {
    try {
        const answer = new Answer(req.body);
        await answer.save();
        res.status(201).json(answer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 특정 답변 수정
exports.updateAnswer = async (req, res) => {
    try {
        const answer = await Answer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!answer) return res.status(404).json({ message: 'Answer not found' });
        res.status(200).json(answer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 특정 답변 삭제
exports.deleteAnswer = async (req, res) => {
    try {
        const answer = await Answer.findByIdAndDelete(req.params.id);
        if (!answer) return res.status(404).json({ message: 'Answer not found' });
        res.status(200).json({ message: 'Answer deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
