"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// --- ICONS ---
const MicIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="23"/><line x1="8" x2="16" y1="23" y2="23"/></svg>;
const MicOffIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="1" x2="23" y1="1" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12"/><line x1="15" x2="15" y1="19" y2="23"/><line x1="8" x2="16" y1="23" y2="23"/><path d="M12 1a3 3 0 0 0-3 3v.33"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>;
const ActivityIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const BrainIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>;
const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const EyeOffIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>;
const MinimizeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>;
const ProjectionIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="1"/><path d="M5 17l2.5-2.5"/><path d="M19 17l-2.5-2.5"/></svg>;
const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>;

export default function WhisperPage() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("Waiting for audio...");
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ghostMode, setGhostMode] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  
  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationRef = useRef<number>(0);

  // Holo-Mode (PiP) Refs
  const pipCanvasRef = useRef<HTMLCanvasElement>(null);
  const pipVideoRef = useRef<HTMLVideoElement>(null);

  // Auto-scroll state refs (must be refs to persist across render loops)
  const scrollRef = useRef({ y: 0, pause: 0 });

  // Speech Recognition Ref
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";
        
        recognition.onresult = (event: any) => {
           let interimTranscript = '';
           let finalTranscript = '';

           for (let i = event.resultIndex; i < event.results.length; ++i) {
             if (event.results[i].isFinal) {
               finalTranscript += event.results[i][0].transcript;
               handleFinalTranscript(finalTranscript); 
             } else {
               interimTranscript += event.results[i][0].transcript;
             }
           }
           if (interimTranscript || finalTranscript) {
               setTranscript(finalTranscript || interimTranscript);
               resetSilenceTimer();
           }
        };

        recognition.onerror = (event: any) => {
            console.error("Speech Error:", event.error);
            if (event.error === 'not-allowed') setError("Microphone access denied.");
        };

        recognitionRef.current = recognition;
      } else {
        setError("Browser not supported. Use Chrome.");
      }
    }
    return () => stopListening();
  }, []);

  // --- 1. PIP AUTO-START ---
  useEffect(() => {
      const initStream = () => {
          if (pipCanvasRef.current && pipVideoRef.current) {
              if (!pipVideoRef.current.srcObject) {
                  try {
                      const ctx = pipCanvasRef.current.getContext('2d');
                      if (ctx) {
                          ctx.clearRect(0, 0, 600, 400);
                          ctx.fillStyle = "#10b981";
                          ctx.font = "20px Arial";
                          ctx.fillText("Holo-Mode Initialized", 20, 50);
                      }

                      const stream = pipCanvasRef.current.captureStream(30);
                      pipVideoRef.current.srcObject = stream;
                      pipVideoRef.current.muted = true;
                      pipVideoRef.current.play().catch(e => console.log("Background play prevented:", e));
                  } catch (err) {
                      console.error("Stream setup failed:", err);
                  }
              }
          }
      };
      setTimeout(initStream, 500);
  }, []);

  // --- PIP RENDER LOOP WITH AUTO-SCROLL ---
  useEffect(() => {
      let animationFrameId: number;
      
      // Reset scroll when text changes
      scrollRef.current.y = 0;
      scrollRef.current.pause = 100; // Pause at start

      const renderLoop = () => {
          if (!pipCanvasRef.current) return;
          const ctx = pipCanvasRef.current.getContext('2d');
          if (!ctx) return;

          const CANVAS_WIDTH = 600;
          const CANVAS_HEIGHT = 400;
          const TEXT_START_Y = 60;
          const PADDING = 40;
          
          // Clear
          ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
          
          // Border
          ctx.strokeStyle = "#10b981"; 
          ctx.lineWidth = 4;
          ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

          // Header (Fixed position)
          ctx.fillStyle = "#10b981";
          ctx.font = "bold 20px Arial";
          ctx.textAlign = "left";
          ctx.textBaseline = "top";
          ctx.fillText("HOLO-HUD ACTIVE", 20, 10);
          
          // Text Content
          const text = suggestion || "Waiting for Question...";
          const lines = text.split('\n');
          let isCodeBlock = false;
          
          // Calculate current Y based on scroll
          let drawY = TEXT_START_Y - scrollRef.current.y;
          let totalContentHeight = 0;

          ctx.shadowColor = "black";
          ctx.shadowBlur = 4;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;

          // Render Logic
          lines.forEach((line) => {
              if (line.trim().startsWith("```")) {
                  isCodeBlock = !isCodeBlock;
                  return;
              }

              let lineHeight = 30;
              if (isCodeBlock) lineHeight = 22;

              // Draw only if visible
              if (drawY > -50 && drawY < CANVAS_HEIGHT + 50) {
                  if (isCodeBlock) {
                      ctx.fillStyle = "#34d399"; // Code Color
                      ctx.font = "bold 16px Courier New"; 
                      ctx.fillText(line, PADDING + 10, drawY);
                  } else {
                      if (line.trim()) {
                          ctx.fillStyle = "#ffffff"; // Text Color
                          ctx.font = "bold 20px Arial";
                          
                          // Word Wrap
                          const words = line.split(' ');
                          let currentLine = "";
                          if (line.startsWith("-")) currentLine += "• ";

                          words.forEach(word => {
                              if (word === "-" || word === "•") return;
                              if (ctx.measureText(currentLine + word).width < 520) {
                                  currentLine += word + " ";
                              } else {
                                  ctx.fillText(currentLine, PADDING, drawY);
                                  drawY += lineHeight;
                                  totalContentHeight += lineHeight;
                                  currentLine = "  " + word + " ";
                              }
                          });
                          ctx.fillText(currentLine, PADDING, drawY);
                      }
                  }
              } else {
                  // Just calculate height if off screen
                  if (line.trim()) {
                      const words = line.split(' ');
                      let currentLine = "";
                      words.forEach(word => {
                          if (ctx.measureText(currentLine + word).width < 520) {
                              currentLine += word + " ";
                          } else {
                              // Simulating line break for height calc
                              drawY += lineHeight;
                              totalContentHeight += lineHeight;
                              currentLine = "  " + word + " ";
                          }
                      });
                  }
              }
              
              drawY += lineHeight;
              totalContentHeight += lineHeight;
          });

          // Auto-Scroll Logic
          const visibleHeight = CANVAS_HEIGHT - TEXT_START_Y;
          
          if (totalContentHeight > visibleHeight) {
              const maxScroll = totalContentHeight - visibleHeight + 100; // +100 buffer
              
              if (scrollRef.current.pause > 0) {
                  scrollRef.current.pause--;
              } else {
                  scrollRef.current.y += 0.5; // Scroll speed
                  
                  if (scrollRef.current.y >= maxScroll) {
                      // Reached bottom, pause then reset
                      scrollRef.current.pause = 180; // 3 seconds pause
                      scrollRef.current.y = -1; // Reset flag
                  } else if (scrollRef.current.y === -1) {
                      // Reset logic
                      scrollRef.current.y = 0;
                  }
              }
          }

          animationFrameId = requestAnimationFrame(renderLoop);
      };

      // Start loop
      renderLoop();

      return () => cancelAnimationFrame(animationFrameId);
  }, [suggestion, transcript]);

  const togglePiP = async () => {
      const video = pipVideoRef.current;
      if (!video) return;

      try {
          if (document.pictureInPictureElement) {
              await document.exitPictureInPicture();
          } else {
              if (video.readyState < 1) {
                  await new Promise((resolve) => {
                      video.onloadedmetadata = () => resolve(true);
                  });
              }
              if (video.paused) await video.play();
              await video.requestPictureInPicture();
          }
      } catch (err) {
          console.error("PiP Error:", err);
          alert("Error starting Holo-Mode. Ensure you are in Chrome/Edge and clicked the page.");
      }
  };

  const handleFinalTranscript = async (text: string) => {
      if (!text.trim()) return;
      setLoading(true);
      try {
          const res = await fetch("http://localhost:8000/api/whisper", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: text })
          });
          const data = await res.json();
          setSuggestion(data.answer);
      } catch (err) {
          console.error(err);
      }
      setLoading(false);
  };

  const resetSilenceTimer = () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
  };

  const startListening = async () => {
    setError(null);
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.fftSize = 256;
        drawVisualizer();

        if (recognitionRef.current) {
            recognitionRef.current.start();
            setListening(true);
        }
    } catch (err) {
        setError("Could not access microphone.");
        console.error(err);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    if (audioContextRef.current) audioContextRef.current.close();
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setListening(false);
  };

  const drawVisualizer = () => {
      if (!analyserRef.current || !canvasRef.current) return;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const render = () => {
          animationRef.current = requestAnimationFrame(render);
          analyserRef.current!.getByteFrequencyData(dataArray);

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (!ghostMode) {
              ctx.fillStyle = "#030305";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          const barWidth = (canvas.width / bufferLength) * 2.5;
          let barHeight;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
              barHeight = dataArray[i] / 2;
              ctx.fillStyle = ghostMode ? `rgba(52, 211, 153, 0.5)` : `rgb(52, 211, 153)`; 
              ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
              x += barWidth + 1;
          }
      };
      render();
  };

  // --- HELPER: Smart Message Parser ---
  const renderMessageContent = (content: string) => {
      const parts = content.split(/(```[\s\S]*?```)/g);

      return parts.map((part, index) => {
          if (part.startsWith("```")) {
              const codeContent = part.replace(/^```[a-z]*\n/, "").replace(/```$/, "");
              return (
                  <div key={index} className="relative my-4 bg-[#1E1E1E] border border-gray-700 rounded-lg p-4 overflow-x-auto group shadow-lg">
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                              onClick={() => navigator.clipboard.writeText(codeContent)}
                              className="p-1 bg-gray-700 rounded hover:bg-gray-600 text-gray-300 text-xs flex items-center gap-1"
                          >
                              <CopyIcon width={12} /> Copy
                          </button>
                      </div>
                      <pre className="text-sm font-mono text-green-400 leading-relaxed whitespace-pre-wrap">
                          {codeContent}
                      </pre>
                  </div>
              );
          } else {
              return (
                  <div key={index} className="text-white leading-relaxed text-lg whitespace-pre-wrap">
                      {part.split('\n').map((line, i) => {
                          const trimmed = line.trim();
                          if (!trimmed) return <div key={i} className="h-2"></div>;
                          
                          if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
                              return <div key={i} className="ml-4 mb-2 pl-2 border-l-2 border-emerald-500/50">{line}</div>;
                          }
                          if (trimmed.startsWith('**')) {
                              return <div key={i} className="font-bold text-emerald-400 mt-4 mb-1 text-xl">{line.replace(/\*\*/g, '')}</div>
                          }
                          return <div key={i}>{line}</div>;
                      })}
                  </div>
              );
          }
      });
  };

  // --- GHOST MODE UI ---
  if (ghostMode) {
      return (
          <div className="fixed inset-0 bg-transparent z-[9999] pointer-events-none flex flex-col items-center pt-2">
              <div className="pointer-events-auto bg-black/80 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-4 mb-2 border border-white/10 shadow-2xl transition-opacity hover:opacity-100 opacity-50">
                   <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                   <button onClick={() => setGhostMode(false)} className="text-gray-400 hover:text-white flex items-center gap-1 text-xs font-bold uppercase"><MinimizeIcon /> Exit Ghost</button>
                   <button onClick={listening ? stopListening : startListening} className={`text-xs font-bold uppercase ${listening ? 'text-red-400' : 'text-emerald-400'}`}>
                       {listening ? "Stop Mic" : "Start Mic"}
                   </button>
              </div>
              
              <div className="pointer-events-auto w-[600px] max-w-[90vw] max-h-[80vh] overflow-y-auto bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl custom-scrollbar">
                  <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 8px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: rgba(0, 0, 0, 0.3);
                        border-radius: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: rgba(16, 185, 129, 0.5);
                        border-radius: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: rgba(16, 185, 129, 0.8);
                    }
                  `}</style>
                  {loading && <div className="text-xs text-emerald-400 animate-pulse font-mono mb-2">Analyzing Audio Stream...</div>}
                  
                  {suggestion ? (
                       <div className="space-y-2 text-left">
                           {renderMessageContent(suggestion)}
                       </div>
                  ) : (
                       <div className="text-white/50 text-sm font-mono text-center py-8">
                           Waiting for question... (Look here)
                       </div>
                  )}
              </div>
          </div>
      );
  }

  // --- STANDARD HACKER UI ---
  return (
    <div className="min-h-screen bg-[#030305] text-gray-100 font-sans flex flex-col relative overflow-hidden transition-colors duration-500">
      <canvas ref={pipCanvasRef} width={600} height={400} className="fixed top-0 left-0 w-px h-px opacity-0 pointer-events-none" />
      <video 
          ref={pipVideoRef} 
          className="fixed top-0 left-0 w-px h-px opacity-0 pointer-events-none" 
          muted 
          playsInline 
          onLoadedMetadata={() => setIsVideoReady(true)}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98112_1px,transparent_1px),linear-gradient(to_bottom,#10b98112_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <nav className="border-b border-emerald-500/20 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
             <HomeIcon />
             <span className="font-bold">Exit Operation</span>
           </Link>
           <div className="flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full ${listening ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`}></div>
               <span className="font-black text-xl tracking-tight text-emerald-500">LIVE WHISPER <span className="text-xs text-gray-500 font-normal align-middle ml-2">[BETA]</span></span>
           </div>
           
           <div className="flex gap-2">
               <button onClick={togglePiP} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs font-bold uppercase text-emerald-400 transition-all">
                   <ProjectionIcon /> Holo-Mode
               </button>
               <button onClick={() => setGhostMode(true)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase text-gray-300 transition-all">
                   <EyeOffIcon /> Ghost Mode
               </button>
           </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto w-full relative z-10">
        
        <div className="flex-1 flex flex-col gap-6">
            <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-1 shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)] backdrop-blur-md flex flex-col h-1/2">
                <div className="flex justify-between items-center p-3 border-b border-emerald-500/20 bg-emerald-500/5 rounded-t-xl">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2"><ActivityIcon width={16}/> Audio Spectrum</span>
                    <span className="text-[10px] text-emerald-600 font-mono">{listening ? "LIVE FEED ACTIVE" : "OFFLINE"}</span>
                </div>
                <div className="relative flex-1 bg-black/50 rounded-b-xl overflow-hidden flex items-center justify-center">
                     <canvas ref={canvasRef} width="600" height="200" className="w-full h-full opacity-80"></canvas>
                     {!listening && (
                         <div className="absolute inset-0 flex items-center justify-center">
                             <button onClick={startListening} className="flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/30">
                                 <MicIcon /> Initialize System
                             </button>
                         </div>
                     )}
                     {listening && (
                         <div className="absolute bottom-4 right-4">
                             <button onClick={stopListening} className="p-3 bg-red-500/20 hover:bg-red-500/40 text-red-500 rounded-full border border-red-500/50 transition-colors">
                                 <MicOffIcon />
                             </button>
                         </div>
                     )}
                </div>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-2xl p-6 flex-1 overflow-y-auto min-h-[200px]">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Transcript Log</h3>
                <p className="font-mono text-lg text-emerald-100 leading-relaxed">
                    {transcript}
                    {listening && <span className="inline-block w-2 h-5 bg-emerald-500 ml-1 animate-pulse align-middle"></span>}
                </p>
            </div>
        </div>

        <div className="flex-1 bg-[#0A0A0F] border border-emerald-500/50 rounded-2xl p-1 shadow-[0_0_50px_-15px_rgba(16,185,129,0.3)] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
            
            <div className="flex justify-between items-center p-4 border-b border-white/10">
                <span className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2"><BrainIcon width={16}/> Tactical Analysis</span>
                {loading && <span className="text-xs font-mono text-emerald-400 animate-pulse">PROCESSING...</span>}
            </div>

            <div className="flex-1 p-8 flex flex-col justify-center relative">
                {suggestion ? (
                    <div className="absolute inset-0 p-8 overflow-y-auto scrollbar-hide">
                        {renderMessageContent(suggestion)}
                    </div>
                ) : (
                    <div className="text-center text-gray-600 space-y-4">
                        <div className="w-16 h-16 border-4 border-gray-800 border-t-emerald-500 rounded-full animate-spin mx-auto opacity-20"></div>
                        <p className="font-mono text-sm">Awaiting Intercepted Question...</p>
                    </div>
                )}
            </div>
            
            <div className="p-3 border-t border-white/5 bg-white/5 text-center">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                    Tip: Keep browser window near camera for eye contact
                </p>
            </div>
        </div>

      </main>

      {error && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-red-500/10 border border-red-500 text-red-400 px-6 py-3 rounded-xl backdrop-blur-md z-50">
              Error: {error}
          </div>
      )}
    </div>
  );
}