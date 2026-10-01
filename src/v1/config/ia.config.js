import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.IA_API_KEY;

if (!apiKey) {
    throw new Error("Falta la variable IA_API_KEY");
}

const genAI = new GoogleGenerativeAI(apiKey);

const iaModel = genAI.getGenerativeModel({
    model: "gemini-3.5-flash-lite",
    systemInstruction: {
        role: "system",
        parts: [
            {
                text: "Responde de forma clara y breve a la solicitud recibida."
            }
        ]
    }
});

export default iaModel;