import iaModel from "../config/ia.config.js";

export const describirLibro = async (nombreLibro) => {
    const prompt = `
Explica brevemente de qué trata el libro "${nombreLibro}".
Devuelve únicamente una descripción de 2 o 3 oraciones.
    `.trim();

    const result = await iaModel.generateContent(prompt);

    return result.response.text().trim();
};