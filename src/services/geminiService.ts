import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function diagnosePhoneProblem(description: string) {
  if (!genAI) {
    throw new Error("Gemini API key is not configured");
  }

  const prompt = `
    Siz professional telefon ta'mirlash ustasisiz. 
    Foydalanuvchi o'z telefonidagi muammoni quyidagicha tasvirladi: "${description}".
    
    Iltimos, quyidagilarni o'zbek tilida tushuntiring:
    1. Muammoning ehtimoliy sabablari.
    2. Taxminiy ta'mirlash choralari.
    3. Ta'mirlashning murakkablik darajasi (Oson, O'rtacha, Qiyin).
    4. Foydalanuvchiga maslahat (masalan, "darhol o'chiring", "zaryadga qo'ymang" va h.k.).
    
    Javobni qisqa, aniq va do'stona ohangda bering. Markdown formatidan foydalaning.
  `;

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini diagnosis error:", error);
    throw new Error("Diagnostika qilishda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.");
  }
}
