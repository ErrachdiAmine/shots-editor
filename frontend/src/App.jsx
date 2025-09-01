import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import EditorList from './pages/EditorList';

const EditorLayout = lazy(() => import('./pages/EditorLayout'));

export default function App() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="editor" element={<EditorList />} />
          <Route path="editor/:id/*" element={<EditorLayout />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
