import React from 'react';
import { Outlet, NavLink } from 'react-router';
import logo from '../assets/logo.png'

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow z-30 flex items-center px-4">
        <img src={logo} alt="Logo" className='size-8'/>
        <nav className="flex gap-4 ml-5">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-indigo-600 font-bold' : 'text-slate-700 font-bold'}>Home</NavLink>
          <NavLink to="/editor" className={({isActive}) => isActive ? 'text-indigo-600 font-bold' : 'text-slate-700 font-bold'}>Editor</NavLink>
        </nav>
        <div className="ml-auto text-sm text-slate-500">Demo</div>
      </header>

      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}
