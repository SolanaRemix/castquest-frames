import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "CastQuest Admin",
  description: "Operator dashboard for CastQuest."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-50">
        <div className="min-h-screen flex">
          <aside className="w-60 border-r border-zinc-800 p-4 space-y-4 bg-zinc-950">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              <span className="text-sm font-semibold uppercase tracking-[0.16em]">
                Operator
              </span>
            </div>
            <nav className="space-y-2 text-sm">
              <a href="/" className="block text-zinc-300 hover:text-emerald-400">Overview</a>
              <a href="/quests" className="block text-zinc-300 hover:text-emerald-400">Quests</a>
              <a href="/frames" className="block text-zinc-300 hover:text-emerald-400">Frames</a>
              <a href="/mints" className="block text-zinc-300 hover:text-emerald-400">Mints</a>
              <a href="/brain" className="block text-zinc-300 hover:text-emerald-400">Smart Brain</a>
              <a href="/systems" className="block text-zinc-300 hover:text-emerald-400">Systems</a>
            </nav>
          </aside>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}