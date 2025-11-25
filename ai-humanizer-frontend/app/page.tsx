"use client";
import React from "react";
import Link from "next/link";

// --- ICONS ---
const SparklesIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
const SearchIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const BoltIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>;
const PenIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>;
const GlobeIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const GhostIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 22v-5"/><path d="M12 22v-4"/><path d="M15 22v-5"/><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7ZM9 9h.01"/><path d="M15 9h.01"/></svg>;
const FileIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>;
const MessageIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const MagicIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 15 2 2 4-4"/><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
const ArrowIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const EarIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 9H2v6h4l5 5V4L6 9Z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>;
const RobotIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/><path d="m9 12 5-5 5 5-5 5-5-5"/></svg>;
const ShieldIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const CloudIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17.5 19c4.142 0 7.5-3.358 7.5-7.5c0-4.142-3.358-7.5-7.5-7.5c-3.866 0-7 3.134-7 7c0 1.72.57 3.303 1.526 4.574C12.35 16.23 13 17.2 13 18s-.65 1.77-2.026 2.426C9.97 21.073 9 22 7.5 22c-4.142 0-7.5-3.358-7.5-7.5c0-4.142 3.358-7.5 7.5-7.5c.757 0 1.488.114 2.176.324"/></svg>;
const SecurityIcon = (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 17v-4h4"/><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030305] text-gray-100 font-sans selection:bg-blue-500/30 flex flex-col relative overflow-hidden">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] -z-10" />

      {/* HEADER */}
      <nav className="w-full border-b border-white/5 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <span className="font-black text-2xl tracking-tighter text-white">Stealth<span className="text-blue-500">Suite</span></span>
           </div>
           <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 font-mono">v3.5.0 Sentinel</div>
        </div>
      </nav>

      {/* HERO */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-8">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
              Undetectable AI.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient bg-300%">
              Unbeatable Stealth.
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            The complete suite for rewriting, detecting, summarizing, and creating undetectable content.
          </p>
        </div>

        {/* CARDS GRID - 14 CARDS (Responsive Layout) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[100rem] w-full px-4">
          


          {/* RESUME STEALTH (1x1) */}
          <a href="/resume" className="group relative hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-[2rem] blur opacity-20 group-hover:opacity-50 transition-opacity" />
            <div className="relative h-full bg-[#0A0A0F]/90 backdrop-blur-xl border border-blue-500/30 rounded-[2rem] p-6 flex flex-col gap-4 hover:border-blue-500/50">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 w-fit"><ShieldIcon /></div>
              <h2 className="text-lg font-bold text-white">Resume Stealth</h2>
              <p className="text-xs text-gray-400 leading-relaxed flex-1">Scans resume for bias triggers and optimizes it to bypass ATS bots.</p>
              <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">Launch <ArrowIcon /></div>
            </div>
          </a>

          {/* LIVE WHISPER (1x1) */}
          <a href="/whisper" className="group relative hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-green-500 rounded-[2rem] blur opacity-20 group-hover:opacity-50 transition-opacity" />
            <div className="relative h-full bg-[#0A0A0F]/90 backdrop-blur-xl border border-emerald-500/30 rounded-[2rem] p-6 flex flex-col gap-4 hover:border-emerald-500/50">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit"><EarIcon /></div>
              <h2 className="text-lg font-bold text-white">Live Whisper</h2>
              <p className="text-xs text-gray-400 leading-relaxed flex-1">Real-time interview assistant. Intercepts audio and projects answers instantly.</p>
              <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">Launch <ArrowIcon /></div>
            </div>
          </a>

          {/* STEALTH AGENTS (1x1) */}
          <a href="/agents" className="group relative hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-orange-500 rounded-[2rem] blur opacity-20 group-hover:opacity-50 transition-opacity" />
            <div className="relative h-full bg-[#0A0A0F]/90 backdrop-blur-xl border border-amber-500/30 rounded-[2rem] p-6 flex flex-col gap-4 hover:border-amber-500/50">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 w-fit"><RobotIcon /></div>
              <h2 className="text-lg font-bold text-white">Stealth Agents</h2>
              <p className="text-xs text-gray-400 leading-relaxed flex-1">Deploy autonomous bots to research, write, or code complex missions.</p>
              <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">Launch <ArrowIcon /></div>
            </div>
          </a>

          {/* HUMANIZER */}
          <a href="/humanizer" className="group relative hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[2rem] blur opacity-20 group-hover:opacity-50 transition-opacity" />
            <div className="relative h-full bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex flex-col gap-4 hover:border-blue-500/50">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 w-fit"><SparklesIcon /></div>
              <h2 className="text-lg font-bold text-white">Humanizer</h2>
              <p className="text-xs text-gray-400 leading-relaxed flex-1">Rewrite text to bypass detectors using our Heavy Stealth engine.</p>
              <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">Launch <ArrowIcon /></div>
            </div>
          </a>

          {/* DETECTOR */}
          <a href="/detector" className="group relative hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-600 to-orange-500 rounded-[2rem] blur opacity-20 group-hover:opacity-50 transition-opacity" />
            <div className="relative h-full bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex flex-col gap-4 hover:border-rose-500/50">
              <div className="p-3 bg-rose-500/10 rounded-xl text-rose-400 w-fit"><SearchIcon /></div>
              <h2 className="text-lg font-bold text-white">Detector</h2>
              <p className="text-xs text-gray-400 leading-relaxed flex-1">Forensic analysis to detect robotic perplexity and structure.</p>
              <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">Launch <ArrowIcon /></div>
            </div>
          </a>

          {/* PROMPT PERFECTOR */}
          <a href="/prompt" className="group relative hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-fuchsia-500 rounded-[2rem] blur opacity-20 group-hover:opacity-50 transition-opacity" />
            <div className="relative h-full bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex flex-col gap-4 hover:border-pink-500/50">
              <div className="p-3 bg-pink-500/10 rounded-xl text-pink-400 w-fit"><MagicIcon /></div>
              <h2 className="text-lg font-bold text-white">Prompt Perfector</h2>
              <p className="text-xs text-gray-400 leading-relaxed flex-1">Turn vague ideas into God-Tier prompts for ChatGPT & Gemini.</p>
              <div className="text-[10px] font-bold text-pink-400 uppercase tracking-wider flex items-center gap-2">Launch <ArrowIcon /></div>
            </div>
          </a>

          {/* MESSAGE GENERATOR */}
          <a href="/generator" className="group relative hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-sky-500 rounded-[2rem] blur opacity-20 group-hover:opacity-50 transition-opacity" />
            <div className="relative h-full bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex flex-col gap-4 hover:border-cyan-500/50">
              <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 w-fit"><MessageIcon /></div>
              <h2 className="text-lg font-bold text-white">Message Gen</h2>
              <p className="text-xs text-gray-400 leading-relaxed flex-1">Turn rough ideas into polished emails or messages instantly.</p>
              <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">Launch <ArrowIcon /></div>
            </div>
          </a>

          {/* SUMMARIZER */}
          <a href="/summarizer" className="group relative hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-[2rem] blur opacity-20 group-hover:opacity-50 transition-opacity" />
            <div className="relative h-full bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex flex-col gap-4 hover:border-amber-500/50">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 w-fit"><BoltIcon /></div>
              <h2 className="text-lg font-bold text-white">Summarizer</h2>
              <p className="text-xs text-gray-400 leading-relaxed flex-1">Condense long text into stealthy bullet points instantly.</p>
              <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">Launch <ArrowIcon /></div>
            </div>
          </a>

          {/* EXPANDER */}
          <a href="/expander" className="group relative hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-violet-500 rounded-[2rem] blur opacity-20 group-hover:opacity-50 transition-opacity" />
            <div className="relative h-full bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex flex-col gap-4 hover:border-purple-500/50">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 w-fit"><PenIcon /></div>
              <h2 className="text-lg font-bold text-white">Writer</h2>
              <p className="text-xs text-gray-400 leading-relaxed flex-1">Expand short notes into full, undetectable essays or emails.</p>
              <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">Launch <ArrowIcon /></div>
            </div>
          </a>

          {/* TRANSLATOR */}
          <a href="/translator" className="group relative hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-[2rem] blur opacity-20 group-hover:opacity-50 transition-opacity" />
            <div className="relative h-full bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex flex-col gap-4 hover:border-teal-500/50">
              <div className="p-3 bg-teal-500/10 rounded-xl text-teal-400 w-fit"><GlobeIcon /></div>
              <h2 className="text-lg font-bold text-white">Translator</h2>
              <p className="text-xs text-gray-400 leading-relaxed flex-1">Translate text while maintaining a 100% native, natural tone.</p>
              <div className="text-[10px] font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">Launch <ArrowIcon /></div>
            </div>
          </a>

          {/* GHOST PROTOCOL */}
          <a href="/ghost" className="group relative hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-pink-600 rounded-[2rem] blur opacity-20 group-hover:opacity-50 transition-opacity" />
            <div className="relative h-full bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex flex-col gap-4 hover:border-indigo-500/50">
              <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 w-fit"><GhostIcon /></div>
              <h2 className="text-lg font-bold text-white">Ghost Protocol</h2>
              <p className="text-xs text-gray-400 leading-relaxed flex-1">Clone your personal writing style to make AI sound exactly like you.</p>
              <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">Launch <ArrowIcon /></div>
            </div>
          </a>

          {/* PAPER TRAIL */}
          <a href="/papertrail" className="group relative hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-lime-500 rounded-[2rem] blur opacity-20 group-hover:opacity-50 transition-opacity" />
            <div className="relative h-full bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex flex-col gap-4 hover:border-emerald-500/50">
              <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400 w-fit"><FileIcon /></div>
              <h2 className="text-lg font-bold text-white">Paper Trail</h2>
              <p className="text-xs text-gray-400 leading-relaxed flex-1">Generate notes, outlines, and rough drafts to prove you wrote it.</p>
              <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">Launch <ArrowIcon /></div>
            </div>
          </a>

        </div>
      </main>
    </div>
  );
}