import React, { useState, useRef, useEffect } from 'react';
import { toPng, toBlob } from 'html-to-image';
import {
  Sparkles,
  Upload,
  Download,
  Copy,
  Check,
  Zap,
  Layers,
  Image as ImageIcon,
  Sliders,
  Maximize2,
  Minimize2,
  RefreshCw,
  Eye,
  Camera,
  Share2,
  Code2,
  Monitor,
  Smartphone,
  Square,
  LayoutTemplate,
  RotateCcw,
} from 'lucide-react';

const GRADIENTS = [
  { id: 'cyberpunk', name: 'Cyberpunk Neon', bg: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #06b6d4 100%)' },
  { id: 'obsidian', name: 'Obsidian Cyan', bg: 'linear-gradient(135deg, #090a10 0%, #0d2838 50%, #051923 100%)' },
  { id: 'sunset', name: 'Sunset Fusion', bg: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 50%, #fbc531 100%)' },
  { id: 'velvet', name: 'Linear Indigo', bg: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #4f46e5 100%)' },
  { id: 'emerald', name: 'Emerald Matrix', bg: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #10b981 100%)' },
  { id: 'aurora', name: 'Aurora Borealis', bg: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)' },
  { id: 'midnight', name: 'Midnight Dark', bg: '#0b0c14' },
  { id: 'transparent', name: 'Transparent', bg: 'transparent' },
];

const SAMPLES = {
  code: {
    title: 'useAgentWorkflow.ts',
    url: 'https://github.com/ErrachdiAmine/shots-editor',
    content: `// Next-Gen Agentic Architecture
import { createAutonomousPipeline } from '@vibe/agent';

export async function orchestrateProductBuild(spec: ProductSpec) {
  const agent = await createAutonomousPipeline({
    model: 'hermes-v3',
    velocity: '10x',
    telemetry: 'live'
  });

  return agent.shipToProduction(spec);
}`,
  },
  metrics: {
    title: 'System Telemetry Dashboard',
    url: 'https://portfolio-errachdi.vercel.app',
    isMetrics: true,
  },
};

export default function App() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Settings State
  const [imageSrc, setImageSrc] = useState(null);
  const [sampleType, setSampleType] = useState('code'); // 'code' | 'image'
  const [selectedGradient, setSelectedGradient] = useState(GRADIENTS[0].id);
  const [padding, setPadding] = useState(56);
  const [frameStyle, setFrameStyle] = useState('macos-dark'); // 'macos-dark' | 'macos-light' | 'browser' | 'none'
  const [windowTitle, setWindowTitle] = useState('App.tsx — Shots Studio');
  const [windowUrl, setWindowUrl] = useState('https://portfolio-errachdi.vercel.app');
  const [shadowStyle, setShadowStyle] = useState('heavy'); // 'none' | 'soft' | 'heavy' | 'neon'
  const [borderRadius, setBorderRadius] = useState(16);
  const [aspectRatio, setAspectRatio] = useState('auto'); // 'auto' | '16/9' | '1/1' | '4/3'
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [watermark, setWatermark] = useState('✨ Built with Shots Studio • Amine Errachdi');
  const [showWatermark, setShowWatermark] = useState(true);

  // Status feedback
  const [isExporting, setIsExporting] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Handle image upload
  const handleFileUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
      setSampleType('image');
      setWindowTitle(file.name);
    };
    reader.readAsDataURL(file);
  };

  // Paste listener
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          handleFileUpload(file);
          break;
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Export Image to PNG
  const handleExportPng = async () => {
    if (!canvasRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(canvasRef.current, {
        pixelRatio: 2.5,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `shots-staged-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Copy Image to Clipboard
  const handleCopyClipboard = async () => {
    if (!canvasRef.current) return;
    try {
      setIsExporting(true);
      const blob = await toBlob(canvasRef.current, { pixelRatio: 2.5 });
      if (blob && navigator.clipboard?.write) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2500);
      }
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const currentBg = GRADIENTS.find((g) => g.id === selectedGradient)?.bg || GRADIENTS[0].bg;

  return (
    <div className="min-h-screen bg-[#090a10] text-neutral-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-neutral-950">
      {/* Top Header */}
      <header className="w-full glass-panel border-b border-white/10 px-4 sm:px-6 py-3.5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <Camera size={16} className="text-white" />
            </div>
            <div>
              <span className="text-sm sm:text-base font-black tracking-tight text-white flex items-center gap-1.5 font-mono">
                SHOTS <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">STUDIO</span>
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileUpload(e.target.files?.[0])}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-button text-xs font-semibold text-neutral-300 hover:text-white cursor-pointer"
            >
              <Upload size={13} className="text-cyan-400" />
              <span className="hidden sm:inline">Upload Screenshot</span>
            </button>

            <button
              onClick={handleCopyClipboard}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-button text-xs font-semibold text-neutral-300 hover:text-white cursor-pointer"
            >
              {copySuccess ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span className="hidden sm:inline">{copySuccess ? 'Copied!' : 'Copy to Clipboard'}</span>
            </button>

            <button
              onClick={handleExportPng}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Download size={14} />
              <span>{isExporting ? 'Staging...' : 'Export High-Res PNG'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Studio Inspector Controls (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Background Gradients Card */}
          <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Sparkles size={13} className="text-cyan-400" />
                <span>Backdrop Presets</span>
              </label>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {GRADIENTS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGradient(g.id)}
                  style={{ background: g.bg }}
                  className={`h-10 rounded-xl border transition-all cursor-pointer ${
                    selectedGradient === g.id
                      ? 'border-cyan-400 scale-105 shadow-md shadow-cyan-500/30'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                  title={g.name}
                />
              ))}
            </div>
          </div>

          {/* Frame Style & Chrome */}
          <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4 shadow-xl">
            <label className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <LayoutTemplate size={13} className="text-cyan-400" />
              <span>Window Frame & Mockup</span>
            </label>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setFrameStyle('macos-dark')}
                className={`px-3 py-2 rounded-xl text-left transition-all ${
                  frameStyle === 'macos-dark'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'glass-button text-neutral-400 hover:text-white'
                }`}
              >
                macOS Dark
              </button>
              <button
                onClick={() => setFrameStyle('macos-light')}
                className={`px-3 py-2 rounded-xl text-left transition-all ${
                  frameStyle === 'macos-light'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'glass-button text-neutral-400 hover:text-white'
                }`}
              >
                macOS Light
              </button>
              <button
                onClick={() => setFrameStyle('browser')}
                className={`px-3 py-2 rounded-xl text-left transition-all ${
                  frameStyle === 'browser'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'glass-button text-neutral-400 hover:text-white'
                }`}
              >
                Safari URL Bar
              </button>
              <button
                onClick={() => setFrameStyle('none')}
                className={`px-3 py-2 rounded-xl text-left transition-all ${
                  frameStyle === 'none'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'glass-button text-neutral-400 hover:text-white'
                }`}
              >
                Borderless Glass
              </button>
            </div>

            {frameStyle === 'browser' ? (
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Browser Mock URL</label>
                <input
                  type="text"
                  value={windowUrl}
                  onChange={(e) => setWindowUrl(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                />
              </div>
            ) : (
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Window Title</label>
                <input
                  type="text"
                  value={windowTitle}
                  onChange={(e) => setWindowTitle(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                />
              </div>
            )}
          </div>

          {/* Sliders (Padding, Shadows, Radius, 3D Tilt) */}
          <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4 shadow-xl text-xs">
            <label className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sliders size={13} className="text-cyan-400" />
              <span>Canvas Geometry & 3D Tilt</span>
            </label>

            {/* Inset Padding */}
            <div>
              <div className="flex justify-between text-neutral-400 mb-1">
                <span>Inset Padding</span>
                <span className="font-mono text-cyan-300">{padding}px</span>
              </div>
              <input
                type="range"
                min="16"
                max="96"
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Corner Radius */}
            <div>
              <div className="flex justify-between text-neutral-400 mb-1">
                <span>Border Radius</span>
                <span className="font-mono text-cyan-300">{borderRadius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="32"
                value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* 3D Rotate X */}
            <div>
              <div className="flex justify-between text-neutral-400 mb-1">
                <span>3D Tilt (Pitch)</span>
                <span className="font-mono text-cyan-300">{rotateX}°</span>
              </div>
              <input
                type="range"
                min="-20"
                max="20"
                value={rotateX}
                onChange={(e) => setRotateX(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* 3D Rotate Y */}
            <div>
              <div className="flex justify-between text-neutral-400 mb-1">
                <span>3D Rotate (Yaw)</span>
                <span className="font-mono text-cyan-300">{rotateY}°</span>
              </div>
              <input
                type="range"
                min="-20"
                max="20"
                value={rotateY}
                onChange={(e) => setRotateY(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Reset 3D button */}
            {(rotateX !== 0 || rotateY !== 0) && (
              <button
                onClick={() => {
                  setRotateX(0);
                  setRotateY(0);
                }}
                className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300"
              >
                <RotateCcw size={11} />
                <span>Reset 3D Angle</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Canvas Preview Viewport (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center">
          {/* Canvas Wrapper */}
          <div className="w-full flex items-center justify-center p-4 sm:p-8 bg-neutral-950/60 rounded-3xl border border-white/5 overflow-hidden">
            <div
              ref={canvasRef}
              style={{
                background: currentBg,
                padding: `${padding}px`,
                perspective: '1200px',
              }}
              className="relative max-w-full flex flex-col items-center justify-center transition-all duration-200 select-none"
            >
              {/* Staged Window Card */}
              <div
                style={{
                  borderRadius: `${borderRadius}px`,
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transformStyle: 'preserve-3d',
                  boxShadow:
                    shadowStyle === 'heavy'
                      ? '0 30px 60px -12px rgba(0,0,0,0.7), 0 18px 36px -18px rgba(0,0,0,0.8)'
                      : '0 15px 30px -8px rgba(0,0,0,0.5)',
                }}
                className="overflow-hidden bg-[#0e1017] border border-white/15 w-full max-w-[620px] transition-all"
              >
                {/* Window Header */}
                {frameStyle === 'macos-dark' && (
                  <div className="px-4 py-3 bg-[#161822] border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-xs font-mono text-neutral-400 font-medium">
                      {windowTitle}
                    </span>
                    <div className="w-8" />
                  </div>
                )}

                {frameStyle === 'macos-light' && (
                  <div className="px-4 py-3 bg-neutral-100 border-b border-neutral-300 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-xs font-mono text-neutral-600 font-medium">
                      {windowTitle}
                    </span>
                    <div className="w-8" />
                  </div>
                )}

                {frameStyle === 'browser' && (
                  <div className="px-4 py-2.5 bg-[#161822] border-b border-white/10 flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    </div>
                    <div className="flex-1 bg-black/40 rounded-lg px-3 py-1 text-[11px] font-mono text-neutral-400 border border-white/5 truncate text-center">
                      🔒 {windowUrl}
                    </div>
                  </div>
                )}

                {/* Window Body Content */}
                <div className="p-5 sm:p-7 bg-[#0b0c13]">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt="Staged content"
                      className="w-full h-auto rounded-lg object-contain"
                    />
                  ) : sampleType === 'code' ? (
                    <pre className="font-mono text-xs sm:text-sm text-neutral-200 leading-relaxed overflow-x-auto">
                      <code>{SAMPLES.code.content}</code>
                    </pre>
                  ) : null}
                </div>
              </div>

              {/* Watermark Pill */}
              {showWatermark && (
                <div className="mt-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80">
                  {watermark}
                </div>
              )}
            </div>
          </div>

          <p className="text-xs text-neutral-500 font-mono mt-4 text-center">
            💡 Tip: You can paste any screenshot directly with <strong className="text-neutral-300">Ctrl + V</strong> / <strong className="text-neutral-300">Cmd + V</strong> or drag an image onto the screen.
          </p>
        </div>
      </main>
    </div>
  );
}
