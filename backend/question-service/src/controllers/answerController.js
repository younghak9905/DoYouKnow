const Answer = require('../models/answerModel');
const Question = require('../models/questionModel');
const { generateAnswer } = require('../services/gptService'); // GPT API 연동

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
        const { id } = req.params;

        // DB에서 답변 찾기
        const answer = await Answer.findById(id).populate('questionId', 'title');
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }

        res.status(200).json(answer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//질문 ID로 조회 + GPT
exports.getAnswerByQuestionId = async (req, res) => {
    try {
        const { questionId } = req.params;

        // DB에서 질문 ID로 답변 찾기
        let answer = await Answer.findOne({ questionId }).populate('questionId', 'title');
        if (answer) {
            return res.status(200).json(answer);
        }

        // DB에 답변이 없으면 질문 확인
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // GPT API로 답변 생성
        const gptResponse = await generateAnswer(question.title);
        const { answerText, followUpQuestions } = gptResponse;

        // 새 답변 DB 저장
        answer = new Answer({
            questionId,
            answerText,
            followUpQuestions,
        });
        await answer.save();

        res.status(201).json(answer);
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
