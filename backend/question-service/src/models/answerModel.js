const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // 사용자 ID (선택)
    answerText: { type: String, required: true }, // 답변 내용
    isAppProvided: { type: Boolean, default: false }, // 앱 제공 답변 여부
    createdAt: { type: Date, default: Date.now }, // 답변 생성 시간
});

module.exports = mongoose.model('Answer', answerSchema);
