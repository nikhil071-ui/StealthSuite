"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// --- ICONS ---
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>;
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const HistoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/></svg>;
const CompareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l5 5"/><path d="M4 4l5 5"/></svg>;

type HistoryItem = {
  id: number;
  input: string;
  output: string;
  mode: string;
  timestamp: string;
};

export default function HumanizerPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [humanizerMode, setHumanizerMode] = useState("standard");
  
  // New features
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    const count = input.trim() === "" ? 0 : input.trim().split(/\s+/).length;
    setWordCount(count);
  }, [input]);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem("humanizer_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const addToHistory = (textIn: string, textOut: string, mode: string) => {
    const newItem = {
      id: Date.now(),
      input: textIn,
      output: textOut,
      mode: mode,
      timestamp: new Date().toLocaleTimeString()
    };
    const updated = [newItem, ...history].slice(0, 5); // Keep last 5
    setHistory(updated);
    localStorage.setItem("humanizer_history", JSON.stringify(updated));
  };

  const handleProcess = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput("");
    setShowCompare(false);

    try {
      const res = await fetch("http://localhost:8000/api/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, mode: humanizerMode }),
      });
      const data = await res.json();
      setOutput(data.humanized_text);
      addToHistory(input, data.humanized_text, humanizerMode);
    } catch (error) {
      alert("Backend Error. Is it running?");
    }
    setLoading(false);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
           <div className="font-black text-xl tracking-tight text-blue-500">HUMANIZE</div>
           <div className="w-8"></div>
        </div>
      </nav>

      <div className="flex-1 max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-[250px_1fr] gap-8 w-full">
        
        {/* HISTORY SIDEBAR (Left) */}
        <div className="hidden lg:flex flex-col gap-4 sticky top-24 h-fit">
           <div className="flex items-center gap-2 text-gray-500 px-2 text-xs font-bold uppercase tracking-wider">
             <HistoryIcon /> Recent Rewrites
           </div>
           {history.length === 0 ? (
             <div className="p-6 rounded-xl border border-white/5 border-dashed text-center text-gray-600 text-xs">No history yet.</div>
           ) : (
             history.map((item) => (
               <button 
                 key={item.id}
                 onClick={() => { setInput(item.input); setOutput(item.output); setHumanizerMode(item.mode); }}
                 className="text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/30 transition-all group"
               >
                 <div className="flex justify-between items-center mb-1">
                   <span className="text-[10px] font-bold text-blue-400 uppercase">{item.mode}</span>
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
                    <span className="text-xs font-bold text-gray-500 uppercase px-2">AI Text Input</span>
                    <div className="flex gap-3 items-center">
                      <span className="text-xs text-gray-600 font-mono">{wordCount} words</span>
                      {input && <button onClick={() => {setInput(""); setOutput("");}} className="text-gray-500 hover:text-red-400"><TrashIcon /></button>}
                    </div>
                  </div>
                  <textarea
                    className="w-full flex-1 bg-transparent p-4 text-gray-300 placeholder:text-gray-700 focus:outline-none resize-none leading-relaxed text-lg"
                    placeholder="Paste text here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ minHeight: "400px" }}
                  />
                  {/* MODE SELECTOR */}
                  <div className="p-2 border-t border-white/5 flex gap-2">
                    {["standard", "professional", "academic"].map((m) => (
                      <button
                        key={m}
                        onClick={() => setHumanizerMode(m)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${humanizerMode === m ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
              </div>
            </div>

            {/* RIGHT: OUTPUT */}
            <div className="flex flex-col gap-4 relative">
              {/* ACTION ARROW (Desktop) */}
              <div className="absolute top-1/2 -left-3 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block pointer-events-none">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/50 text-blue-400">➜</div>
              </div>
              
              {/* MOBILE ACTION BUTTON */}
              <button 
                    onClick={handleProcess} 
                    disabled={loading || !input}
                    className="lg:hidden w-full py-4 bg-blue-600 rounded-xl font-bold text-white disabled:opacity-50 shadow-lg shadow-blue-900/50"
              >
                    {loading ? "Processing..." : "Humanize Text"}
              </button>

              <div className={`bg-[#0A0A0F]/80 backdrop-blur-sm border rounded-2xl p-1 shadow-2xl h-full flex flex-col relative transition-all ${output ? 'border-blue-500/30 shadow-blue-900/10' : 'border-white/10'}`}>
                  <div className="flex justify-between items-center p-3 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-blue-400 uppercase px-2">Human Result</span>
                        {output && (
                          <button 
                            onClick={() => setShowCompare(!showCompare)}
                            className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded border transition-all ${showCompare ? 'bg-blue-500/20 text-blue-300 border-blue-500/50' : 'bg-white/5 text-gray-400 border-white/10'}`}
                          >
                            <CompareIcon /> {showCompare ? "Show Result" : "Compare"}
                          </button>
                        )}
                    </div>
                    {output && (
                      <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white transition-colors">
                        {copied ? <CheckIcon /> : <CopyIcon />} {copied ? "Copied" : "Copy"}
                      </button>
                    )}
                  </div>
                  <div className="p-6 flex-1 overflow-y-auto relative min-h-[400px]">
                    {output ? (
                      showCompare ? (
                        <div className="grid gap-4 text-sm h-full">
                           <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-gray-400">
                             <div className="text-[10px] font-bold text-red-500 mb-2 uppercase tracking-wider">Original</div>
                             {input}
                           </div>
                           <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 text-gray-300">
                             <div className="text-[10px] font-bold text-green-500 mb-2 uppercase tracking-wider">Humanized</div>
                             {output}
                           </div>
                        </div>
                      ) : (
                        <p className="text-gray-200 leading-relaxed whitespace-pre-wrap text-lg animate-in fade-in duration-500">{output}</p>
                      )
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-800 select-none">
                          <span className="text-5xl mb-4 opacity-20">✨</span>
                          <span className="text-sm font-medium uppercase tracking-widest">Waiting for input</span>
                      </div>
                    )}
                  </div>
              </div>
            </div>
          </div>

          {/* DESKTOP ACTION BUTTON (Centered Bottom) */}
          <div className="hidden lg:flex justify-center">
             <button
               onClick={handleProcess}
               disabled={loading || !input}
               className="group relative px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 bg-blue-600 text-white shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] border border-blue-400/30"
             >
               <span className="relative z-10 flex items-center gap-2">
                 {loading ? "Rewriting..." : "✨ Humanize Text"}
               </span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}