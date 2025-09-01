import { Link } from "react-router";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12">
      {/* Hero Section */}
      <section className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">
          Fast screenshot editing — crop, annotate, export
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Upload or create a new screenshot and start editing right away.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/editor/new"
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
          >
            Start Editing
          </Link>
          <label for="upload" className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100">upload</label>
          <input type="file" id="upload" accept="image/*" hidden />
        
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl">
        <div className="p-4 border rounded-lg shadow-sm text-center">
          <span className="text-2xl">✂️</span>
          <h3 className="font-semibold mt-2">Crop & Resize</h3>
          <p className="text-sm text-gray-600">
            Quickly crop and resize your screenshots.
          </p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm text-center">
          <span className="text-2xl">✏️</span>
          <h3 className="font-semibold mt-2">Draw & Annotate</h3>
          <p className="text-sm text-gray-600">
            Use pen tools to highlight or mark areas.
          </p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm text-center">
          <span className="text-2xl">🔤</span>
          <h3 className="font-semibold mt-2">Add Text & Shapes</h3>
          <p className="text-sm text-gray-600">
            Insert text, arrows, and shapes with ease.
          </p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm text-center">
          <span className="text-2xl">💾</span>
          <h3 className="font-semibold mt-2">Export & Save</h3>
          <p className="text-sm text-gray-600">
            Download or save your edits in one click.
          </p>
        </div>
      </section>

      {/* Recent Projects Placeholder */}
      <section className="mt-20 max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-4">Recent Projects</h2>
        <p className="text-gray-500">
          No recent projects yet. Start editing to see them here.
        </p>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-gray-500 text-sm">
        © 2025 YourApp — All rights reserved.
      </footer>
    </div>
  );
}
