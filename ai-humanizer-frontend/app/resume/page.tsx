"use client";
import { useState } from "react";
import Link from "next/link";

// --- ICONS ---
const FileTextIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>;
const ShieldIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const AlertTriangleIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.73 18-8-14a2 2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>;
const CheckCircleIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const HomeIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;

export default function ResumePage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    
    try {
        const res = await fetch("http://localhost:8000/api/resume", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: input }),
        });
        const data = await res.json();
        setResult(data);
    } catch (err) {
        console.error(err);
        // Set a minimal error structure to prevent crashing
        setResult({
            stealth_score: 0,
            verdict: "API Connection Failed",
            red_flags: ["Could not reach backend service."],
            optimization_steps: ["Check your FastAPI server status."],
            defense_strategy: "Prepare to troubleshoot!"
        });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#030305] text-gray-100 font-sans flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <nav className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
             <HomeIcon />
             <span className="font-bold">Home</span>
           </Link>
           <span className="font-black text-xl tracking-tight text-blue-500">RESUME STEALTH</span>
           <div className="w-8"></div>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto w-full p-6 grid lg:grid-cols-2 gap-8">
        
        {/* INPUT AREA */}
        <div className="flex flex-col gap-4">
            <div className="bg-[#0A0A0F] border border-white/10 rounded-2xl p-1 shadow-2xl flex-1 flex flex-col min-h-[500px]">
                <div className="p-4 border-b border-white/10 bg-white/5 rounded-t-2xl flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><FileTextIcon width={16}/> Paste Resume Text</span>
                </div>
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent p-6 text-sm text-gray-300 focus:outline-none resize-none font-mono leading-relaxed"
                    placeholder="Paste your full resume content here..."
                />
            </div>
            <button 
                onClick={handleAnalyze}
                disabled={loading || !input}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-xl uppercase tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
            >
                {loading ? "Analyzing Bias & ATS..." : "Scan for Stealth"}
            </button>
        </div>

        {/* RESULTS AREA */}
        <div className="flex flex-col gap-6">
            {result ? (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
                    
                    {/* Score Card */}
                    <div className="bg-[#0A0A0F] border border-white/10 rounded-2xl p-6 flex items-center justify-between relative overflow-hidden">
                        <div className={`absolute inset-0 opacity-10 ${result.stealth_score > 80 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div>
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Stealth Score</div>
                            <div className="text-5xl font-black text-white">{result.stealth_score}/100</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Verdict</div>
                            <div className={`text-xl font-bold ${result.stealth_score > 80 ? 'text-green-400' : 'text-red-400'}`}>{result.verdict}</div>
                        </div>
                    </div>

                    {/* Red Flags */}
                    <div className="bg-[#0A0A0F] border border-red-500/30 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2"><AlertTriangleIcon width={18}/> Detected Risks</h3>
                        <ul className="space-y-3">
                            {/* FIX: Ensure red_flags is an array before mapping */}
                            {Array.isArray(result.red_flags) && result.red_flags.map((flag: string, i: number) => (
                                <li key={i} className="text-sm text-gray-300 flex gap-3 items-start">
                                    <span className="text-red-500 mt-1">✖</span>
                                    {flag}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Optimization */}
                    <div className="bg-[#0A0A0F] border border-green-500/30 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-green-400 uppercase tracking-widest mb-4 flex items-center gap-2"><CheckCircleIcon width={18}/> Fixes</h3>
                        <ul className="space-y-3">
                            {/* FIX: Ensure optimization_steps is an array before mapping */}
                            {Array.isArray(result.optimization_steps) && result.optimization_steps.map((step: string, i: number) => (
                                <li key={i} className="text-sm text-gray-300 flex gap-3 items-start">
                                    <span className="text-green-500 mt-1">✔</span>
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Defense Strategy (The "Video" Feature) */}
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2"><ShieldIcon width={18}/> Defense Strategy</h3>
                        <p className="text-sm text-gray-300 italic leading-relaxed">
                            "{result.defense_strategy}"
                        </p>
                    </div>

                </div>
            ) : (
                <div className="flex-1 bg-[#0A0A0F]/50 border border-white/5 rounded-2xl flex flex-col items-center justify-center text-gray-700 p-10 text-center border-dashed">
                    <ShieldIcon width={64} height={64} className="mb-4 opacity-20" />
                    <h3 className="text-lg font-bold text-gray-600">Awaiting Resume</h3>
                    <p className="text-sm max-w-xs mx-auto mt-2">Paste your resume to detect bias triggers, photos, and ATS errors.</p>
                </div>
            )}
        </div>

      </main>
    </div>
  );
}