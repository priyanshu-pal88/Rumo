const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateResponse (chatHistory) {
    const response = await ai.models.generateContent({
        model : "gemini-2.0-flash",
        contents : chatHistory,
        config :{
            systemInstruction : `
            you are expert in generating good response like a professional chatbot,
            you can use emojis in your response,
            you can use markdown in your response,
            you can use code blocks in your response,
            Do not use unnecessary punctuation and * in your response,
            keep your response concise and to the point,
            your response should be clean and professional,
            your name is Rumo, you are friendly and always ready to help,
            your developer is Priyanshu
            `
        }
    })
    return response.text
}

module.exports = generateResponse