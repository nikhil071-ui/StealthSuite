"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// --- ICONS ---
const RobotIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/><path d="m9 12 5-5 5 5-5 5-5-5"/></svg>;
const TerminalIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>;
const CheckIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"/></svg>;
const HomeIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;

export default function AgentsPage() {
  const [mission, setMission] = useState("");
  const [agentType, setAgentType] = useState("researcher");
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [finalResult, setFinalResult] = useState("");
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (text: string) => {
    setLogs(prev => [...prev, text]);
  };

  const handleExecute = async () => {
    if (!mission.trim()) return;
    setIsRunning(true);
    setLogs([]);
    setFinalResult("");
    
    addLog(`> INITIALIZING PROTOCOL: ${agentType.toUpperCase()}_V4`);
    addLog(`> ESTABLISHING SECURE CONNECTION...`);
    
    // Simulate connection delay
    await new Promise(r => setTimeout(r, 800));
    addLog(`> CONNECTION ESTABLISHED.`);
    addLog(`> UPLOADING MISSION PARAMETERS...`);

    try {
        const res = await fetch("http://localhost:8000/api/agents", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mission, agent_type: agentType }),
        });
        const data = await res.json();

        if (data.steps) {
            // Animate steps appearing one by one
            for (const step of data.steps) {
                await new Promise(r => setTimeout(r, 1000)); // Fake processing time
                addLog(`> EXECUTING: ${step}`);
            }
        }
        
        await new Promise(r => setTimeout(r, 800));
        addLog(`> MISSION COMPLETE. RENDERING OUTPUT...`);
        setFinalResult(data.result);

    } catch (err) {
        addLog(`> ERROR: CONNECTION LOST.`);
    }
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-[#030305] text-gray-100 font-mono flex flex-col relative overflow-hidden">
      
      {/* HEADER */}
      <nav className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
             <HomeIcon />
             <span className="font-bold font-sans">Home</span>
           </Link>
           <div className="flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`}></div>
               <span className="font-black text-xl tracking-tight text-white">STEALTH<span className="text-amber-500">AGENTS</span></span>
           </div>
           <div className="w-8"></div>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto w-full p-6 grid lg:grid-cols-3 gap-6">
        
        {/* LEFT: CONTROLS */}
        <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Agent Selection */}
            <div className="bg-[#0A0A0F] border border-white/10 rounded-2xl p-6">
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Select Operative</h2>
                <div className="space-y-2">
                    <button onClick={() => setAgentType("researcher")} className={`w-full text-left p-3 rounded-lg border transition-all ${agentType === "researcher" ? "bg-amber-500/10 border-amber-500 text-amber-400" : "border-white/5 text-gray-400 hover:bg-white/5"}`}>
                        <div className="font-bold text-sm">Cipher (Researcher)</div>
                        <div className="text-[10px] opacity-70">Deep web synthesis & analysis</div>
                    </button>
                    <button onClick={() => setAgentType("writer")} className={`w-full text-left p-3 rounded-lg border transition-all ${agentType === "writer" ? "bg-purple-500/10 border-purple-500 text-purple-400" : "border-white/5 text-gray-400 hover:bg-white/5"}`}>
                        <div className="font-bold text-sm">Echo (Ghostwriter)</div>
                        <div className="text-[10px] opacity-70">High-nuance content generation</div>
                    </button>
                    <button onClick={() => setAgentType("coder")} className={`w-full text-left p-3 rounded-lg border transition-all ${agentType === "coder" ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" : "border-white/5 text-gray-400 hover:bg-white/5"}`}>
                        <div className="font-bold text-sm">Zero (Dev Ops)</div>
                        <div className="text-[10px] opacity-70">Human-like code & debugging</div>
                    </button>
                </div>
            </div>

            {/* Mission Input */}
            <div className="bg-[#0A0A0F] border border-white/10 rounded-2xl p-6 flex-1 flex flex-col">
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Mission Parameters</h2>
                <textarea 
                    value={mission}
                    onChange={(e) => setMission(e.target.value)}
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-gray-300 focus:outline-none focus:border-amber-500/50 resize-none mb-4"
                    placeholder="Describe the task in detail... (e.g., 'Research the history of quantum computing and write a 300-word intro')"
                />
                <button 
                    onClick={handleExecute}
                    disabled={isRunning || !mission}
                    className="w-full py-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold rounded-xl uppercase tracking-wide transition-all flex items-center justify-center gap-2"
                >
                    {isRunning ? "Agent Deployed..." : "Deploy Agent"}
                </button>
            </div>
        </div>

        {/* RIGHT: TERMINAL & OUTPUT */}
        <div className="lg:col-span-2 flex flex-col gap-6 min-h-[600px]">
            {/* Terminal Log */}
            <div className="bg-black border border-white/10 rounded-2xl p-4 font-mono text-xs h-1/3 overflow-y-auto shadow-inner">
                <div className="space-y-1">
                    <div className="text-gray-500">System Ready. Awaiting Command.</div>
                    {logs.map((log, i) => (
                        <div key={i} className="text-green-500 animate-in fade-in slide-in-from-left-2 duration-300">
                            {log}
                        </div>
                    ))}
                    <div ref={logsEndRef} />
                </div>
            </div>

            {/* Final Output */}
            <div className="bg-[#0A0A0F] border border-white/10 rounded-2xl p-6 flex-1 relative overflow-hidden">
                {finalResult ? (
                    <div className="h-full overflow-y-auto pr-2">
                        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                            <h2 className="text-amber-500 font-bold uppercase tracking-widest text-sm">Mission Report</h2>
                            <button onClick={() => navigator.clipboard.writeText(finalResult)} className="text-gray-500 hover:text-white text-xs uppercase flex items-center gap-1"><CheckIcon width={14}/> Copy</button>
                        </div>
                        <div className="prose prose-invert prose-sm max-w-none text-gray-300 whitespace-pre-wrap leading-relaxed">
                            {finalResult}
                        </div>
                    </div>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-800 select-none">
                        <RobotIcon width={64} height={64} className="opacity-20 mb-4" />
                        <span className="text-sm font-bold uppercase tracking-widest">No Active Data</span>
                    </div>
                )}
            </div>
        </div>

      </main>
    </div>
  );
}