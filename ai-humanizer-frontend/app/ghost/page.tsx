"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// --- ICONS ---
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>;
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;

export default function GhostPage() {
  const [targetText, setTargetText] = useState("");
  const [referenceText, setReferenceText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleProcess = async () => {
    if (!targetText.trim() || !referenceText.trim()) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("http://localhost:8000/api/ghost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target_text: targetText, reference_text: referenceText }),
      });
      const data = await res.json();
      setOutput(data.ghost_text);
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
           <div className="font-black text-xl tracking-tight text-indigo-500">GHOST PROTOCOL</div>
           <div className="w-8"></div>
        </div>
      </nav>

      <div className="flex-1 max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8 w-full">
        
        {/* LEFT: INPUTS */}
        <div className="flex flex-col gap-6">
           
           {/* REFERENCE INPUT */}
           <div className="bg-[#0A0A0F]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-1 shadow-2xl flex flex-col">
              <div className="flex justify-between items-center p-3 border-b border-white/5">
                <span className="text-xs font-bold text-indigo-400 uppercase px-2">Your Sample (DNA)</span>
                {referenceText && <button onClick={() => setReferenceText("")} className="text-gray-500 hover:text-red-400"><TrashIcon /></button>}
              </div>
              <textarea
                 className="w-full h-40 bg-transparent p-4 text-gray-300 placeholder:text-gray-700 focus:outline-none resize-none text-sm leading-relaxed"
                 placeholder="Paste a sample of your OWN writing here (emails, essays) so we can learn your style..."
                 value={referenceText}
                 onChange={(e) => setReferenceText(e.target.value)}
              />
           </div>

           {/* TARGET INPUT */}
           <div className="bg-[#0A0A0F]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-1 shadow-2xl flex flex-col flex-1">
              <div className="flex justify-between items-center p-3 border-b border-white/5">
                <span className="text-xs font-bold text-gray-500 uppercase px-2">AI Text to Rewrite</span>
                {targetText && <button onClick={() => setTargetText("")} className="text-gray-500 hover:text-red-400"><TrashIcon /></button>}
              </div>
              <textarea
                 className="w-full flex-1 bg-transparent p-4 text-gray-300 placeholder:text-gray-700 focus:outline-none resize-none text-lg leading-relaxed"
                 placeholder="Paste the robotic AI text here..."
                 value={targetText}
                 onChange={(e) => setTargetText(e.target.value)}
                 style={{ minHeight: "200px" }}
              />
           </div>
        </div>

        {/* RIGHT: OUTPUT */}
        <div className="flex flex-col gap-4 relative">
           {/* ACTION ARROW */}
           <div className="absolute top-1/2 -left-3 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block pointer-events-none">
              <div className="w-8 h-8 bg-indigo-600/20 rounded-full flex items-center justify-center border border-indigo-500/50 text-indigo-400">➜</div>
           </div>

           {/* MOBILE BUTTON */}
           <button 
                onClick={handleProcess} 
                disabled={loading || !targetText || !referenceText}
                className="lg:hidden w-full py-4 bg-indigo-600 rounded-xl font-bold text-white disabled:opacity-50"
           >
                {loading ? "Cloning Style..." : "Apply Ghost Protocol"}
           </button>

           <div className={`bg-[#0A0A0F]/80 backdrop-blur-sm border rounded-2xl p-1 shadow-2xl h-full flex flex-col relative transition-all ${output ? 'border-indigo-500/30' : 'border-white/10'}`}>
              <div className="flex justify-between items-center p-3 border-b border-white/5">
                 <span className="text-xs font-bold text-indigo-400 uppercase px-2">Cloned Result</span>
                 {output && (
                   <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white transition-colors">
                     {copied ? <CheckIcon /> : <CopyIcon />} {copied ? "Copied" : "Copy"}
                   </button>
                 )}
              </div>
              <div className="p-6 flex-1 overflow-y-auto relative min-h-[400px]">
                 {output ? (
                   <p className="text-gray-200 leading-relaxed whitespace-pre-wrap text-lg animate-in fade-in duration-500">{output}</p>
                 ) : (
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-800 select-none">
                      <span className="text-5xl mb-4 opacity-20">🧬</span>
                      <span className="text-sm font-medium uppercase tracking-widest">Waiting for DNA</span>
                   </div>
                 )}
              </div>
           </div>
        </div>

        {/* DESKTOP BUTTON */}
        <div className="hidden lg:flex justify-center col-span-2 mt-4">
             <button
               onClick={handleProcess}
               disabled={loading || !targetText || !referenceText}
               className="group relative px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 bg-indigo-600 text-white shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] border border-indigo-400/30"
             >
               <span className="relative z-10 flex items-center gap-2">
                 {loading ? "Analyzing DNA..." : "🧬 Apply Ghost Protocol"}
               </span>
             </button>
        </div>

      </div>
    </div>
  );
}