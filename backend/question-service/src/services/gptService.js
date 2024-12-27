const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.GPT_API_KEY,
});

// Your function remains the same
const generateAnswer = async (question) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `
                        역할: IT 기업 HR 담당자로서 기술 면접 질문에 대한 답변을 생성하세요.
                        형식: 
                        1. 질문에 대해 2-3문장으로 요약된 줄글 답변.
                        2. 관련된 꼬리 질문 2개를 생성하세요.
                    `,
                },
                {
                    role: "user",
                    content: question,
                },
            ],
            max_tokens: 400,
        });

        const output = response.choices[0].message.content.trim();
        const [answerText, ...followUpQuestions] = output.split("\n").filter(Boolean);

        return {
            answerText,
            followUpQuestions,
        };
    } catch (error) {
        console.error("GPT API 호출 오류:", error);
        throw new Error("답변 생성 실패");
    }
};

module.exports = { generateAnswer };
