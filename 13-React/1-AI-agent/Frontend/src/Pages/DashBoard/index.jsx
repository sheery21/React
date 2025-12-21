import React, { useEffect, useState } from "react";
import NavBar from "../../Componentes/NavBar";
import Futter from "../../Componentes/Futter";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashBoard = () => {
  const [pitches, setPitches] = useState([]);
  const [idea, setIdea] = useState("");
  const [tone, setTone] = useState("Formal");
  const [generating, setGenerating] = useState(false);
  const [queryError, setQueryError] = useState("");
  const API_URL = "https://react-13-lemon.vercel.app/api/chat";
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("pitchcraft:pitches");
    if (stored) setPitches(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("pitchcraft:pitches", JSON.stringify(pitches));
  }, [pitches]);

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

  const handleCreatePitch = async (e) => {
    e.preventDefault();
    if (idea.trim().length < 6) {
      setQueryError("Please enter at least 6 characters.");
      return;
    }
    setQueryError("");

    const newPitchJSON = await generatePitchFromAI(idea, tone);
    if (!newPitchJSON) return;

    const newPitch = {
      id: Date.now(),
      name: newPitchJSON.startup_name || idea.slice(0, 15) + "…",
      pitch: newPitchJSON,
      createdAt: new Date().toISOString(),
    };
    setPitches([newPitch, ...pitches]);
    setIdea("");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Do you really want to delete this pitch?")) return;
    setPitches(pitches.filter((p) => p.id !== id));
  };

  // VIEW: Open landing page in a new tab
  const handleView = (p) => {
    const htmlContent =
      p.pitch.landing_page.html_css || "<p>No landing page</p>";
    const w = window.open("", "_blank");
    w.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${p.pitch.startup_name}</title>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `);
    w.document.close();
  };

  // EXPORT: Print landing page without opening a new tab
  const handleExport = (p) => {
    const htmlContent =
      p.pitch.landing_page.html_css || "<p>No landing page</p>";
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    document.body.appendChild(iframe);
    iframe.contentDocument.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${p.pitch.startup_name}</title>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `);
    iframe.contentDocument.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-extrabold">
                PitchCraft — AI Startup Partner
              </h1>
              <p className="text-sm text-gray-600">
                Generate structured startup pitches quickly
              </p>
            </div>
            <button
              onClick={() => navigate("/create")}
              className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90"
            >
              + Create New Pitch
            </button>
          </header>

          <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <section className="md:col-span-2 bg-white p-5 rounded-2xl shadow-sm">
              <h2 className="font-semibold mb-3">Saved Pitches</h2>
              {pitches.length === 0 ? (
                <p className="text-gray-500">No pitches yet.</p>
              ) : (
                <ul className="space-y-3">
                  {pitches.map((p) => (
                    <li
                      key={p.id}
                      className="border rounded-lg p-3 flex items-start justify-between"
                    >
                      <div>
                        <h3 className="font-semibold text-lg">
                          {p.pitch.startup_name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {p.pitch.tagline}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(p.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <button
                          onClick={() => handleView(p)}
                          className="px-3 py-1 border rounded text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleExport(p)}
                          className="px-3 py-1 border rounded text-sm"
                        >
                          Export
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="px-3 py-1 border rounded text-sm text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <aside className="bg-white p-5 rounded-2xl shadow-sm sticky top-6">
              <h3 className="font-semibold">Generate New Pitch</h3>
              <p className="text-sm text-gray-500 mb-3">
                Enter your idea and select tone.
              </p>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full border rounded px-2 py-1 mb-3"
              >
                <option>Formal</option>
                <option>Friendly</option>
                <option>Playful</option>
                <option>Persuasive</option>
              </select>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Describe your startup idea..."
                className="w-full border rounded p-2 h-24 mb-3"
              />
              <button
                onClick={handleCreatePitch}
                className="w-full py-2 bg-black text-white rounded hover:opacity-90"
              >
                {generating ? "Generating..." : "Generate Pitch"}
              </button>
              {queryError && (
                <p className="text-red-500 text-sm mt-2">{queryError}</p>
              )}
            </aside>
          </main>
        </div>
      </div>
      <Futter />
    </>
  );
};

export default DashBoard;
