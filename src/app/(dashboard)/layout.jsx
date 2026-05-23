'use client';
import { useEffect } from 'react';

export default function DashboardLayout({ children }) {
  useEffect(() => {
    // Baseline network presence tracking monitors
    const handleOnline = () => console.log('Network connected');
    const handleOffline = () => console.warn('Network offline fallback active');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FC] dark:bg-[#0D0E12] text-slate-900 dark:text-slate-100 flex antialiased">
      <aside className="w-64 bg-white dark:bg-[#14161F] border-r border-slate-100 dark:border-zinc-800 p-6 flex flex-col justify-between hidden md:flex m-4 mr-0 rounded-2xl shadow-sm">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <div className="h-8 w-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">W</div>
            <span className="font-bold tracking-tight text-lg text-slate-900 dark:text-white">Worknoon</span>
          </div>
          <nav className="space-y-1.5">
            <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 text-indigo-600 font-medium text-sm cursor-pointer">
              💬 Inbox Channels
            </div>
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col p-4 overflow-hidden h-[calc(100vh-2rem)]">
        {children}
      </main>
    </div>
  );
}
