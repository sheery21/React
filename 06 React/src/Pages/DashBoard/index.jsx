import React, { useEffect, useState } from "react";
import NavBar from "../../Componentes/NavBar";
import Futter from "../../Componentes/Futter";

const DashBoard = () => {
  const [pitches, setPitches] = useState([]);
  const [selected, setSelected] = useState(null);
  const [idea, setIdea] = useState("");
  const [tone, setTone] = useState("Formal");
  const [generating, setGenerating] = useState(false);
  const [queryError, setQueryError] = useState("");

  // Load pitches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("pitchcraft:pitches");
    if (stored) setPitches(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("pitchcraft:pitches", JSON.stringify(pitches));
  }, [pitches]);

  // Call Firebase Function to generate pitch
  const generatePitchFromAI = async (ideaText, tone = "Formal") => {
    try {
      setGenerating(true);
      const res = await fetch("/api/generatePitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: ideaText, tone }),
      });
      const data = await res.json();
      setGenerating(false);
      return data.pitch;
    } catch (error) {
      setGenerating(false);
      console.error("AI Error:", error);
      return "Error generating pitch.";
    }
  };

  const handleCreatePitch = async (e) => {
    e.preventDefault();
    if (idea.trim().length < 6) {
      setQueryError("Please enter at least 6 characters.");
      return;
    }
    setQueryError("");

    const newPitchText = await generatePitchFromAI(idea, tone);
    const newPitch = {
      id: Date.now(),
      name: idea.slice(0, 15) + "…",
      pitch: newPitchText,
      createdAt: new Date().toISOString(),
    };
    setPitches([newPitch, ...pitches]);
    setIdea("");
    setSelected(newPitch);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Do you really want to delete this pitch?")) return;
    setPitches(pitches.filter((p) => p.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const handleExport = (p) => {
    const html = `
      <html>
        <head><title>${p.name}</title></head>
        <body>
          <h1>${p.name}</h1>
          <p>${p.pitch}</p>
        </body>
      </html>`;
    const w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
    w.print();
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
                Generate startup pitches quickly and creatively
              </p>
            </div>
            <button
              onClick={() => setIdea("")}
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
                        <h3 className="font-semibold text-lg">{p.name}</h3>
                        <p className="text-sm text-gray-600">{p.pitch}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(p.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <button
                          onClick={() => setSelected(p)}
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
