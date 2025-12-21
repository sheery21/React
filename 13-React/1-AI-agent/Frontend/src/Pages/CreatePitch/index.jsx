import React, { useState } from "react";
import NavBar from "../../Componentes/NavBar";
import Futter from "../../Componentes/Futter";
import axios from "axios";

const CreatePitch = () => {
  const [idea, setIdea] = useState("");
  const [tone, setTone] = useState("Formal");
  const [generating, setGenerating] = useState(false);
  const [queryError, setQueryError] = useState("");
  const API_URL = "http://localhost:3000/api/chat";

  const generatePitchFromAI = async (ideaText, tone = "Formal") => {
    try {
      setGenerating(true);
      const message = `Idea: ${ideaText} \n Tone: ${tone}\nGenerate structured startup pitch in JSON format: { "startup_name": "", "tagline": "", "one_liner": "", "problem": "", "solution": "", "target_audience": "", "unique_value_proposition": "", "elevator_pitch": "", "landing_page": { "html_css": "" }, "additional_suggestions": "" }`;
      const response = await axios.post(API_URL, { message });
      setGenerating(false);
      return response.data.reply;
    } catch (error) {
      setGenerating(false);
      console.error("AI Error:", error);
      return null;
    }
  };

  const handleCreatePitch = async () => {
    if (idea.trim().length < 6) {
      setQueryError("Please enter at least 6 characters.");
      return;
    }
    setQueryError("");
    const newPitchJSON = await generatePitchFromAI(idea, tone);
    console.log(newPitchJSON);
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Ask AI to Generate Your Startup Pitch
        </h1>
        <div className="w-full max-w-2xl">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Enter your startup idea..."
            className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:border-blue-500 mb-4 h-28 resize-none"
          />
          <div className="flex items-center justify-between mb-4">
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none"
            >
              <option>Formal</option>
              <option>Friendly</option>
              <option>Playful</option>
              <option>Persuasive</option>
            </select>
            <button
              onClick={handleCreatePitch}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium"
            >
              {generating ? "Generating..." : "Generate"}
            </button>
          </div>
          {queryError && (
            <p className="text-red-500 text-sm mt-1">{queryError}</p>
          )}
        </div>
      </div>
      <Futter />
    </>
  );
};

export default CreatePitch;
