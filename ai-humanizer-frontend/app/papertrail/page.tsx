"use client";
import { useState } from "react";
import Link from "next/link";
import { Caveat } from 'next/font/google';

const handwritingFont = Caveat({ subsets: ['latin'], weight: ['400', '700'] });

// --- ICONS ---
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
const PrintIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

type NoteBlock = {
  type: "text" | "diagram";
  data?: string; 
  svg?: string;  
  caption?: string;
};

export default function PaperTrailPage() {
  const [input, setInput] = useState("");
  const [pages, setPages] = useState(3);
  const [depth, setDepth] = useState("normal"); // Research Depth
  const [loading, setLoading] = useState(false);
  
  const [notesData, setNotesData] = useState<NoteBlock[]>([]);
  const [outline, setOutline] = useState("");
  const [draft, setDraft] = useState("");
  
  const [activeTab, setActiveTab] = useState<"notes" | "outline" | "draft">("draft");
  const [viewMode, setViewMode] = useState<"text" | "notebook">("text");
  const [copied, setCopied] = useState(false);

  const handleProcess = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setNotesData([]);
    setOutline("");
    setDraft("");

    try {
      const res = await fetch("http://localhost:8000/api/papertrail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, pages: pages, depth: depth }),
      });
      const data = await res.json();
      
      setNotesData(data.notes_content || []);
      setOutline(data.outline);
      setDraft(data.rough_draft);
      
      setActiveTab("notes"); 
      setViewMode("notebook"); 
    } catch (error) {
      alert("Backend Error. Is it running?");
    }
    setLoading(false);
  };

  const handleCopy = () => {
    let textToCopy = "";
    if (activeTab === "notes") textToCopy = notesData.map(b => b.type === 'text' ? b.data : `[Diagram: ${b.caption}]`).join('\n\n');
    if (activeTab === "outline") textToCopy = outline;
    if (activeTab === "draft") textToCopy = draft;

    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#030305] text-gray-100 font-sans flex flex-col relative print:bg-white print:text-black">
      
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .notebook-container { width: 100%; max-width: 21cm; margin: 0 auto; }
          .notebook-content { page-break-inside: auto; }
          .notebook-diagram { page-break-inside: avoid; }
          ::-webkit-scrollbar { display: none; }
        }
        .sketch-svg text {
            font-family: '${handwritingFont.style.fontFamily}', cursive !important;
            font-weight: 700;
            fill: #1e3a8a !important; 
        }
        .sketch-svg path, .sketch-svg line, .sketch-svg rect, .sketch-svg circle { 
            filter: url('#pencil'); 
            stroke-width: 2px;
            stroke: #000000 !important; 
            fill: none;
        }
      `}</style>

      <svg className="hidden">
        <filter id="pencil">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
      </svg>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10 no-print"></div>

      <nav className="border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
             <HomeIcon />
             <span className="font-bold">Home</span>
           </Link>
           <div className="font-black text-xl tracking-tight text-emerald-500">PAPER TRAIL</div>
           <div className="w-8"></div>
        </div>
      </nav>

      <div className="flex-1 max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8 w-full no-print">
        <div className="flex flex-col gap-4">
           <div className="bg-[#0A0A0F]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-1 shadow-2xl h-full flex flex-col">
              <div className="flex justify-between items-center p-3 border-b border-white/5">
                <span className="text-xs font-bold text-gray-500 uppercase px-2">Final AI Essay</span>
                {input && <button onClick={() => setInput("")} className="text-gray-500 hover:text-red-400"><TrashIcon /></button>}
              </div>
              <textarea
                 className="w-full flex-1 bg-transparent p-4 text-gray-300 placeholder:text-gray-700 focus:outline-none resize-none leading-relaxed text-lg"
                 placeholder="Paste your finished text here..."
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 style={{ minHeight: "300px" }}
              />
              
              {/* CONFIG PANEL */}
              <div className="p-4 border-t border-white/5 bg-black/20 rounded-b-2xl flex flex-col gap-4">
                 {/* Page Count */}
                 <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-emerald-400 uppercase">Target Length</span>
                        <span className="text-xs font-mono text-white">{pages} Pages (~{pages * 70} words)</span>
                    </div>
                    <input 
                        type="range" min="1" max="20" value={pages} 
                        onChange={(e) => setPages(parseInt(e.target.value))} 
                        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                 </div>

                 {/* Research Depth */}
                 <div className="flex gap-2">
                    <button onClick={() => setDepth("normal")} className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all ${depth === "normal" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-gray-800 text-gray-500"}`}>Normal Research</button>
                    <button onClick={() => setDepth("deep")} className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all ${depth === "deep" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "bg-gray-800 text-gray-500"}`}>Deep / Extra</button>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex flex-col gap-4 relative">
           <div className="absolute top-1/2 -left-3 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block pointer-events-none">
              <div className="w-8 h-8 bg-emerald-600/20 rounded-full flex items-center justify-center border border-emerald-500/50 text-emerald-400">➜</div>
           </div>

           <button onClick={handleProcess} disabled={loading || !input} className="lg:hidden w-full py-4 bg-emerald-600 rounded-xl font-bold text-white disabled:opacity-50">
                {loading ? (pages > 4 ? "Generating Chunks..." : "Generating Evidence...") : "🕵️ Create Paper Trail"}
           </button>

           <div className={`bg-[#0A0A0F]/80 backdrop-blur-sm border rounded-2xl p-1 shadow-2xl h-full flex flex-col relative transition-all ${draft ? 'border-emerald-500/30' : 'border-white/10'}`}>
              <div className="flex justify-between items-center p-2 border-b border-white/5">
                 {viewMode === "text" ? (
                     <div className="flex gap-2">
                        <button onClick={() => setActiveTab("notes")} disabled={!notesData.length} className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${activeTab === "notes" ? "bg-emerald-500/20 text-emerald-400" : "text-gray-500 hover:text-gray-300"}`}>Notes</button>
                        <button onClick={() => setActiveTab("outline")} disabled={!outline} className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${activeTab === "outline" ? "bg-emerald-500/20 text-emerald-400" : "text-gray-500 hover:text-gray-300"}`}>Outline</button>
                        <button onClick={() => setActiveTab("draft")} disabled={!draft} className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${activeTab === "draft" ? "bg-emerald-500/20 text-emerald-400" : "text-gray-500 hover:text-gray-300"}`}>Draft</button>
                     </div>
                 ) : (
                     <div className="text-xs font-bold text-emerald-400 uppercase px-2 flex items-center gap-2">
                        <BookIcon /> Live Notebook Preview
                     </div>
                 )}

                 <div className="flex items-center gap-2 border-l border-white/10 pl-2">
                    <button onClick={() => setViewMode(viewMode === "text" ? "notebook" : "text")} disabled={!draft} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${viewMode === "notebook" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "text-gray-400 hover:text-white"}`}>
                        {viewMode === "text" ? "View Notebook" : "View Text"}
                    </button>
                    {viewMode === "notebook" && (
                        <button onClick={handlePrint} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold uppercase bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all">
                            <PrintIcon /> Print PDF
                        </button>
                    )}
                    {viewMode === "text" && (
                        <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white transition-colors px-2">
                            {copied ? <CheckIcon /> : <CopyIcon />} {copied ? "Copied" : "Copy"}
                        </button>
                    )}
                 </div>
              </div>

              <div className="p-0 flex-1 overflow-y-auto relative min-h-[400px] max-h-[600px]">
                 {draft ? (
                   <div className="animate-in fade-in duration-500 h-full">
                       {viewMode === "text" && (
                           <div className="p-6">
                               {activeTab === "notes" && (
                                   <div className="space-y-4">
                                       {notesData.map((block, i) => (
                                           block.type === 'text' 
                                           ? <p key={i} className="text-gray-300 font-mono text-sm whitespace-pre-wrap">{block.data}</p>
                                           : <div key={i} className="p-4 border border-emerald-500/20 rounded bg-emerald-500/5 text-emerald-400 text-xs text-center">[Diagram: {block.caption}]</div>
                                       ))}
                                   </div>
                               )}
                               {activeTab === "outline" && <p className="text-gray-300 font-mono text-sm whitespace-pre-wrap">{outline}</p>}
                               {activeTab === "draft" && <p className="text-gray-200 leading-relaxed whitespace-pre-wrap text-lg">{draft}</p>}
                           </div>
                       )}

                       {viewMode === "notebook" && (
                           <div className="flex flex-col items-center justify-start p-4 bg-gray-900 h-full overflow-y-auto">
                               <p className="text-gray-400 text-xs mb-4">↓ Scroll to review. Click "Print PDF" to download.</p>
                               <div className="w-full bg-white text-black p-8 relative shadow-2xl origin-top transform scale-95" style={{ minHeight: '800px' }}>
                                   <NotebookContent notesData={notesData} outline={outline} draft={draft} />
                               </div>
                           </div>
                       )}
                   </div>
                 ) : (
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-800 select-none">
                      <span className="text-5xl mb-4 opacity-20">🕵️</span>
                      <span className="text-sm font-medium uppercase tracking-widest">Waiting for input</span>
                   </div>
                 )}
              </div>
           </div>
        </div>

        <div className="hidden lg:flex justify-center col-span-2 mt-4">
             <button onClick={handleProcess} disabled={loading || !input} className="group relative px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 bg-emerald-600 text-white shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] border border-emerald-400/30">
               <span className="relative z-10 flex items-center gap-2">{loading ? (pages > 4 ? "Generating Chunks..." : "Generating Evidence...") : "🕵️ Create Paper Trail"}</span>
             </button>
        </div>
      </div>

      <div className="hidden print:block">
          <div className="notebook-container bg-white text-black relative min-h-screen">
               <NotebookContent notesData={notesData} outline={outline} draft={draft} />
          </div>
      </div>
    </div>
  );
}

function NotebookContent({ notesData, outline, draft }: { notesData: NoteBlock[], outline: string, draft: string }) {
    return (
        <div className="relative text-left">
            {/* Lined Paper Background */}
            <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(#999 1px, transparent 1px)', backgroundSize: '100% 2.5rem', marginTop: '4rem', height: '100%' }} />
            <div className="absolute top-0 bottom-0 left-[3cm] w-[2px] bg-red-300 z-0"></div>
            
            {/* Holes */}
            <div className="absolute left-[1cm] top-[5%] w-4 h-4 bg-gray-100 rounded-full border border-gray-300 z-0"></div>
            <div className="absolute left-[1cm] top-[50%] w-4 h-4 bg-gray-100 rounded-full border border-gray-300 z-0"></div>
            <div className="absolute left-[1cm] bottom-[5%] w-4 h-4 bg-gray-100 rounded-full border border-gray-300 z-0"></div>

            <div className="relative z-10 ml-[2cm] pt-[1cm]">
                {/* NOTES */}
                <h2 className={`${handwritingFont.className} text-4xl font-bold mb-6 text-blue-700 notebook-section-title`}>Project Notes</h2>
                <div className={`${handwritingFont.className} text-3xl leading-[2.5rem] text-blue-900 mb-12`}>
                    {notesData.map((block, i) => (
                       block.type === 'text' ? (
                           <p key={i} className="mb-4 notebook-text">{block.data}</p>
                       ) : (
                           // Diagram Render
                           <div key={i} className="my-8 flex flex-col items-center transform -rotate-1 notebook-diagram break-inside-avoid">
                               <div className="w-64 h-64 sketch-svg" dangerouslySetInnerHTML={{ __html: block.svg || '' }} />
                               <span className="text-xl text-gray-500 mt-2 font-sans text-sm">({block.caption})</span>
                           </div>
                       )
                   ))}
                </div>

                {/* OUTLINE */}
                <div className="w-full h-[2px] bg-blue-200 my-8"></div>
                <h2 className={`${handwritingFont.className} text-4xl font-bold mb-6 text-blue-700 notebook-section-title`}>Structure Outline</h2>
                <div className={`${handwritingFont.className} text-3xl leading-[2.5rem] text-blue-900 whitespace-pre-wrap mb-12 notebook-text`}>{outline}</div>

                {/* DRAFT */}
                <div className="w-full h-[2px] bg-blue-200 my-8"></div>
                <h2 className={`${handwritingFont.className} text-4xl font-bold mb-6 text-blue-700 notebook-section-title`}>First Draft</h2>
                <div className={`${handwritingFont.className} text-3xl leading-[2.5rem] text-blue-900 whitespace-pre-wrap notebook-text`}>{draft}</div>
            </div>
        </div>
    );
}