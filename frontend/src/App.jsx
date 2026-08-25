import { Outlet } from 'react-router';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 relative flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      {/* BACKGROUND GRID & AMBIENT AURORA GLOWS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* Glowing atmospheric orbs */}
      <div className="absolute -top-32 -left-32 size-[500px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 -right-32 size-[450px] bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none animate-pulse-slow [animation-delay:2s]" />
      <div className="absolute -bottom-32 left-1/3 size-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow [animation-delay:4s]" />

      <Outlet />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(15, 23, 42, 0.85)',
            color: '#f8fafc',
            border: '1px solid rgba(51, 65, 85, 0.7)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px -3px rgba(6, 182, 212, 0.2)',
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
            padding: '12px 16px',
          },
          success: {
            iconTheme: {
              primary: '#06b6d4',
              secondary: '#0f172a',
            },
          },
          error: {
            iconTheme: {
              primary: '#f43f5e',
              secondary: '#0f172a',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
