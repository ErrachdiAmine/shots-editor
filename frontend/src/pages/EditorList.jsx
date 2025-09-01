import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

const STORAGE_KEY = 'screenshot_editor_docs_v1';

export default function EditorList() {
  const [docs, setDocs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    setDocs(raw ? JSON.parse(raw) : []);
  }, []);

  function createBlank() {
    const id = Date.now().toString();
    console.log(Date.now())
    const doc = {
      id, 
      name: `Untitled-${id.slice(-4)}`,
      createdAt: new Date().toISOString(),
      dataUrl: null,
    };
    const next = [doc, ...docs];
    console.log(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setDocs(next);
    navigate(`/editor/${id}`);
  }

  function removeDoc(id) {
    const next = docs.filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setDocs(next);
  }

  function duplicateDoc(d) {
    const id = Date.now().toString();
    const copy = {
      ...d,
      id,
      name: `${d.name} (copy)`,
      createdAt: new Date().toISOString(),
    };
    const next = [copy, ...docs];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setDocs(next);
    navigate(`/editor/${copy.id}`);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-black-100">My Projects</h1>
        <div className="flex gap-2">
          <button
            onClick={createBlank}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            New blank
          </button>
          <Link to="/" className="px-4 py-2 border border-slate-700 text-slate-0 rounded">
            Home
          </Link>
        </div>
      </div>

      {docs.length === 0 ? (
        <div className="p-6 bg-slate-800 rounded border border-slate-700 text-slate-400">
          You have no projects yet. Click “New blank” or upload on the Home page.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {docs.map(d => (
            <div key={d.id} className="flex flex-col bg-slate-800 rounded border border-slate-700 p-3">
              <div className="h-40 bg-slate-900 rounded flex items-center justify-center overflow-hidden">
                {d.dataUrl ? (
                  <img src={d.dataUrl} alt={d.name} className="object-contain w-full h-full" />
                ) : (
                  <div className="text-slate-500">Blank canvas</div>
                )}
              </div>

              <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                    <div className="text-sm text-slate-100 font-medium">{d.name}</div>
                    <div className="text-xs text-slate-500">{new Date(d.createdAt).toLocaleString()}</div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-2">
                    <button
                    onClick={() => navigate(`/editor/${d.id}`)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
                    >
                    Open
                    </button>
                    <button
                    onClick={() => duplicateDoc(d)}
                    className="px-3 py-1 border border-slate-700 text-slate-200 rounded text-sm"
                    >
                    Duplicate
                    </button>
                    <button
                    onClick={() => removeDoc(d.id)}
                    className="px-3 py-1 border border-red-600 text-red-300 rounded text-sm"
                    >
                    Delete
                    </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
