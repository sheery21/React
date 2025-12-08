import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // if (!message) {
    //   return res.status(400).json({
    //     message: "Prompt is required!",
    //   });
    // }

    const prompt = `Here is my startup idea: ${message}. Please generate a complete startup pitch and return output strictly in JSON format.`;
    const resp = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        systemInstruction: `
        Your job is to take a startup idea from the user and generate:

1. A complete structured startup pitch (in JSON format)
2. A fully coded landing page (HTML + CSS in a single file)
3. Always return output in clean JSON format EXACTLY like this:

{ "startup_name": "", "tagline": "", "one_liner": "", "problem": "", "solution": "", "target_audience": "", "unique_value_proposition": "", "elevator_pitch": "", "landing_page": { "html_css": "" }, "additional_suggestions": "" }

Rules:

Tone must be creative, simple, and investor-friendly.
Startup name must be brandable, not generic.
Landing page must be clean, responsive, modern, and written using pure HTML + CSS (no external frameworks).
Add a hero section, features section, pricing CTA, and testimonials section.
Strictly return JSON only — no explanation or extra commentary.
If user idea is incomplete, make assumptions and explain them inside additional_suggestions.`,
      },
    });

    let aiText =  resp?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("aiText" ,aiText);
    

    // if (typeof aiText !== "string") {
    //   aiText = JSON.stringify(aiText);
    // }

    const parsed = JSON.parse(aiText);
    res.json({
      reply: parsed,
    });
  } catch (error) {
    console.log("AI Error:", error);
    res.status(500).json({
      message: error || "Something went wrong!",
    });
  }
});

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
