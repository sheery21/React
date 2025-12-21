import * as functions from "firebase-functions";
import dotenv from "dotenv";
import { logger } from "firebase-functions/logger";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";

dotenv.config();

// Load service account credentials
const credentials = JSON.parse(fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, "utf-8"));

// Initialize Google GenAI client with service account
const ai = new GoogleGenAI({ credentials });

functions.setGlobalOptions({ maxInstances: 10, timeoutSeconds: 60 });

export const generateStartup = functions.https.onRequest(async (req, res) => {
  try {
    const idea = req.body.idea;

    if (!idea) {
      return res
        .status(400)
        .json({ success: false, message: "Startup idea is required" });
    }

    const prompt = `Here is my startup idea: ${idea}. Generate a complete structured startup pitch in JSON including landing page HTML+CSS.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const outputJSON = JSON.parse(response.text());

    return res.status(200).json({ success: true, data: outputJSON });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});
