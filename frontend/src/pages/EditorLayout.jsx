import { list } from 'postcss';
import React, { use, useRef, useState } from 'react';
import move from '../assets/expand-arrows.png';
import crop from '../assets/crop.png';
import shape from '../assets/shape.png';
import text from '../assets/text.png';
import background from '../assets/background.png';
import draw from '../assets/draw.png';
import up from '../assets/up.png';
import down from '../assets/down.png';







export default function EditorLayout() {
  const fileRef = useRef(null);
  const [activeTool, setActiveTool] = useState('move');
  const [imageSrc, setImageSrc] = useState(null);
  const [imageMeta, setImageMeta] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(100);
  const [dropdown, setDropdown] = useState(false);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target.result;
      const img = new Image();
      img.onload = () => {
        setImageMeta({ width: img.width, height: img.height });
        setImageSrc(src);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  }

  function handleLoadSample() {
    // small public-domain sample; replace with your own sample if needed
    const sample = 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=1200&q=80&auto=format&fit=crop';
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImageMeta({ width: img.width, height: img.height });
      setImageSrc(sample);
    };
    img.src = sample;
  }

  

  function handleExport() {
    if (!imageSrc) return;
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'screenshot.png';
    link.click();
  }

  const tools = [
    { id: 'move', label: 'Move', emoji: move },
    { id: 'crop', label: 'Crop', emoji: crop },
    { id: 'draw', label: 'Draw', emoji: draw },
    { id: 'text', label: 'Text', emoji: text },
    { id: 'shapes', label: 'Shapes', emoji: shape },
    { id: 'BG', label: 'BG', emoji: background },
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b-0.5 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-indigo-600 text-white flex items-center justify-center font-bold">E</div>
          <h1 className="text-lg font-semibold">Screenshot Editor</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="px-3 py-1 rounded border bg-white text-sm text-slate-700"
            onClick={() => {}}
            aria-disabled
          >
            Undo
          </button>

          <button
            className="px-3 py-1 rounded border bg-white text-sm text-slate-700"
            onClick={() => {}}
            aria-disabled
          >
            Redo
          </button>

          <div className="h-6 w-px bg-slate-200 mx-2" />

          <button
            className="px-3 py-1 rounded border bg-white text-sm text-slate-700 flex items-center gap-2"
            onClick={() => fileRef.current?.click()}
          >
            <span>📤</span>
            <span>Upload</span>
          </button>

          <button
            className={`px-3 py-1 rounded text-sm ${imageSrc ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}
            onClick={handleExport}
            disabled={!imageSrc}
          >
            ⤓ Export
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left sided toolbar */}
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-20 md:w-72 bg-white border-r-0.5 p-4 z-10 overflow-auto">
          <div className="flex flex-col gap-2">
            {tools.map((t) => ( 
            <>
              <button
                key={t.id}
                onClick={() => setActiveTool(t.id)}
                className={`flex gap-3 p-2 rounded border-transparent bg-slate-50 ${activeTool === t.id ? 'bg-indigo-50 text-indigo-700 font-bold' : 'hover:bg-slate-200 font-bold'}`}
              >
                <img className="size-4.5" src={t.emoji} />
                <span className="hidden md:inline text-sm">{t.label}</span>
                <img src={up} alt="arrowup" className={`flex ml-auto size-4 ${activeTool === t.id ? 'rotate-y-180 transition duration-300' : 'rotate-x-180'} `} />

              </button>

              <div className={`flex items-center p-2 rounded ${activeTool === t.id ? `display-block` : `hidden`}`}>
                <span>Properties Block (demo)</span>
              </div>

            </>
            ))}

            <div className="mt-4 border-t pt-3">
              <button
                onClick={handleLoadSample}
                className="w-full px-3 py-2 rounded bg-slate-100 text-sm"
              >
                Load sample
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 ml-20 md:ml-72 p-6">
          {/* Canvas area */}
          <div className="bg-white rounded shadow-sm p-4 min-h-[60vh] flex flex-col">
            {!imageSrc ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500">
                <div className="text-xl font-medium mb-2">No image loaded</div>
                <div className="mb-4">Upload an image or load the sample to preview the editor layout.</div>
                <div className="flex gap-3">
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="px-4 py-2 rounded bg-indigo-600 text-white"
                  >
                    Upload image
                  </button>
                  <button
                    onClick={handleLoadSample}
                    className="px-4 py-2 rounded border"
                  >
                    Load sample
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div
                  className="bg-slate-100 rounded border p-2"
                  style={{ transform: `scale(${zoom / 100})` }}
                >
                  <img src={imageSrc} alt="uploaded" className="max-w-[80vw] max-h-[60vh] object-contain" />
                </div>
              </div>
            )}

            {/* Zoom controls */}
            <div className="mt-4 border-t pt-3 flex items-center justify-center gap-4">
              <button
                onClick={() => setZoom((z) => Math.max(25, z - 25))}
                className="px-3 py-1 border rounded"
              >
                −
              </button>
              <div className="min-w-[48px] text-center">{zoom}%</div>
              <button
                onClick={() => setZoom((z) => Math.min(400, z + 25))}
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>
          </div>
        </main>

        {/* Right properties panel */}
        <aside className="w-80 p-4 m-4 mt-20 ml-auto">
          <div className="bg-white rounded shadow-sm p-4">
            <h3 className="font-semibold mb-3">Properties</h3>

            <div className="text-sm text-slate-600 mb-4">
              Active tool: <span className="font-medium">{activeTool}</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Dimensions</label>
                <div className="text-sm text-slate-700">
                  {imageMeta.width ? `${imageMeta.width} × ${imageMeta.height}` : '—'}
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-500 mb-1">Brightness</label>
                <input type="range" min="0" max="200" defaultValue="100" className="w-full" disabled />
              </div>

              <div>
                <label className="block text-xs text-slate-500 mb-1">Contrast</label>
                <input type="range" min="0" max="200" defaultValue="100" className="w-full" disabled />
              </div>

              <div>
                <label className="block text-xs text-slate-500 mb-1">Zoom</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={zoom}
                    onChange={(e) => {
                      const v = Number(e.target.value) || 100;
                      setZoom(Math.min(400, Math.max(25, v)));
                    }}
                    className="w-20 px-2 py-1 border rounded"
                  />
                  <span className="text-sm text-slate-500">%</span>
                </div>
              </div>

              <div className="pt-2">
                <button className="w-full px-3 py-2 bg-indigo-600 text-white rounded" onClick={() => {}}>
                  Apply (demo)
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* hidden file input */}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
    </div>
  );
}
