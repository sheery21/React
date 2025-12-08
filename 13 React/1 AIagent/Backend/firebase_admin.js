import * as functions from "firebase-functions";
import { GoogleGenAI } from "@google/genai";

// Gemini API key from Firebase environment config
const ai = new GoogleGenAI({
  apiKey: functions.config().gemini.key
});

// Cloud Function
export const generateStartup = functions.https.onCall(async (data, context) => {
  try {
    const idea = data.idea;

    if (!idea) {
      throw new functions.https.HttpsError('invalid-argument', 'Startup idea is required.');
    }

    // Prepare prompt
    const prompt = `Here is my startup idea: ${idea}. Generate a complete structured startup pitch in JSON including landing page HTML+CSS.`;

    // Call Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    const outputJSON = JSON.parse(response.text());

    return { success: true, data: outputJSON };

  } catch (error) {
    console.error(error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});
