"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// --- ICONS ---
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>;
const HistoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/></svg>;

type HistoryItem = {
  id: number;
  input: string;
  score: number;
  label: string;
  analysis: string;
  timestamp: string;
};

export default function DetectorPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [detectScore, setDetectScore] = useState<number | null>(null);
  const [detectLabel, setDetectLabel] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem("detector_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const addToHistory = (textIn: string, score: number, label: string, analysis: string) => {
    const newItem = {
      id: Date.now(),
      input: textIn,
      score: score,
      label: label,
      analysis: analysis,
      timestamp: new Date().toLocaleTimeString()
    };
    const updated = [newItem, ...history].slice(0, 5); // Keep last 5
    setHistory(updated);
    localStorage.setItem("detector_history", JSON.stringify(updated));
  };

  const handleProcess = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setDetectScore(null);

    try {
      const res = await fetch("http://localhost:8000/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      setDetectScore(data.score);
      setDetectLabel(data.label);
      setAnalysis(data.analysis || "Analysis complete.");
      addToHistory(input, data.score, data.label, data.analysis || "");
    } catch (error) {
      alert("Backend Error. Is it running?");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#030305] text-gray-100 font-sans flex flex-col relative">
      {/* CYBER GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10"></div>

      {/* NAVBAR */}
      <nav className="border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
             <HomeIcon />
             <span className="font-bold">Home</span>
           </Link>
           <div className="font-black text-xl tracking-tight text-rose-500">DETECTOR</div>
           <div className="w-8"></div>
        </div>
      </nav>

      <div className="flex-1 max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-[250px_1fr] gap-8 w-full">
        
        {/* HISTORY SIDEBAR (Left) */}
        <div className="hidden lg:flex flex-col gap-4 sticky top-24 h-fit">
           <div className="flex items-center gap-2 text-gray-500 px-2 text-xs font-bold uppercase tracking-wider">
             <HistoryIcon /> Recent Scans
           </div>
           {history.length === 0 ? (
             <div className="p-6 rounded-xl border border-white/5 border-dashed text-center text-gray-600 text-xs">No history yet.</div>
           ) : (
             history.map((item) => (
               <button 
                 key={item.id}
                 onClick={() => { setInput(item.input); setDetectScore(item.score); setDetectLabel(item.label); setAnalysis(item.analysis); }}
                 className="text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-rose-500/30 transition-all group"
               >
                 <div className="flex justify-between items-center mb-1">
                   <span className={`text-[10px] font-bold uppercase ${item.score > 50 ? 'text-rose-500' : 'text-green-500'}`}>
                     {item.score}% AI
                   </span>
                   <span className="text-[10px] text-gray-600 font-mono">{item.timestamp}</span>
                 </div>
                 <p className="text-xs text-gray-400 line-clamp-2 group-hover:text-gray-200">{item.input}</p>
               </button>
             ))
           )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* LEFT: INPUT */}
            <div className="flex flex-col gap-4">
              <div className="bg-[#0A0A0F]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-1 shadow-2xl h-full flex flex-col">
                  <div className="flex justify-between items-center p-3 border-b border-white/5">
                    <span className="text-xs font-bold text-gray-500 uppercase px-2">Suspicious Text</span>
                    {input && <button onClick={() => {setInput(""); setDetectScore(null);}} className="text-gray-500 hover:text-red-400"><TrashIcon /></button>}
                  </div>
                  <textarea
                    className="w-full flex-1 bg-transparent p-4 text-gray-300 placeholder:text-gray-700 focus:outline-none resize-none leading-relaxed text-lg"
                    placeholder="Paste text to scan for AI patterns..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ minHeight: "400px" }}
                  />
              </div>
            </div>

            {/* RIGHT: OUTPUT */}
            <div className="flex flex-col gap-4 relative">
              {/* ACTION ARROW */}
              <div className="absolute top-1/2 -left-3 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block pointer-events-none">
                  <div className="w-8 h-8 bg-rose-600/20 rounded-full flex items-center justify-center border border-rose-500/50 text-rose-400">➜</div>
              </div>

              {/* MOBILE BUTTON */}
              <button 
                    onClick={handleProcess} 
                    disabled={loading || !input}
                    className="lg:hidden w-full py-4 bg-rose-600 rounded-xl font-bold text-white disabled:opacity-50 shadow-lg shadow-rose-900/50"
              >
                    {loading ? "Scanning..." : "Scan Text"}
              </button>

              <div className={`bg-[#0A0A0F]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl h-full flex flex-col items-center justify-center relative overflow-hidden ${detectScore !== null ? 'border-rose-500/30' : ''}`}>
                  {detectScore !== null ? (
                    <div className="text-center w-full max-w-sm animate-in zoom-in duration-500">
                        <div className="relative mb-8 flex justify-center">
                            {/* GAUGE */}
                            <div className="relative w-56 h-56">
                              <svg className="transform -rotate-90 w-full h-full">
                                <circle cx="112" cy="112" r="100" stroke="#1f2937" strokeWidth="16" fill="transparent" />
                                <circle 
                                  cx="112" cy="112" r="100" stroke={detectScore > 50 ? "#f43f5e" : "#22c55e"} strokeWidth="16" fill="transparent" 
                                  strokeDasharray={628} 
                                  strokeDashoffset={628 - (628 * detectScore) / 100}
                                  strokeLinecap="round"
                                  className="transition-all duration-1000 ease-out"
                                />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                  <span className={`text-6xl font-black tracking-tighter ${detectScore > 50 ? "text-rose-500" : "text-green-500"}`}>
                                    {detectScore}%
                                  </span>
                                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">AI Prob.</span>
                              </div>
                            </div>
                        </div>
                        
                        <div className={`p-5 rounded-2xl border ${detectScore > 50 ? "bg-rose-500/10 border-rose-500/20" : "bg-green-500/10 border-green-500/20"}`}>
                          <h3 className={`text-2xl font-bold mb-2 ${detectScore > 50 ? "text-rose-400" : "text-green-400"}`}>
                            {detectLabel}
                          </h3>
                          <p className="text-sm text-gray-300 leading-relaxed border-t border-gray-700/50 pt-3 mt-3">
                            {analysis}
                          </p>
                        </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-800 gap-3 select-none">
                        <span className="text-6xl opacity-20">🔍</span>
                        <span className="text-sm font-medium uppercase tracking-widest">Waiting for input</span>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* DESKTOP ACTION BUTTON */}
          <div className="hidden lg:flex justify-center">
             <button
               onClick={handleProcess}
               disabled={loading || !input}
               className="group relative px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 bg-rose-600 text-white shadow-[0_0_40px_-10px_rgba(225,29,72,0.5)] border border-rose-400/30"
             >
               <span className="relative z-10 flex items-center gap-2">
                 {loading ? "Scanning..." : "🔍 Scan Text"}
               </span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}