const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const client = new OpenAI({
  apiKey: functions.config().openai.key, 
  baseURL: "https://openrouter.ai/api/v1",
});

app.post("/generatePitch", async (req, res) => {
  try {
    const { idea, tone } = req.body;

    if (!idea) return res.status(400).json({ error: "Idea is required" });

    const prompt = `
      Create a creative startup pitch for this idea:
      "${idea}"
      Tone: ${tone || "professional"}

      Include:
      - Startup Name
      - Tagline
      - Problem
      - Solution
      - Target Audience
      - Hero Line
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.choices[0].message.content;

    res.json({ pitch: text });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ error: "Failed to generate pitch" });
  }
});

exports.api = functions.https.onRequest(app);
