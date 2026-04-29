import { Bell, Search } from 'lucide-react'

export default function TopBar({ title, subtitle }) {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-10">
      
      {/* Left: Page title */}
      <div>
        <h1 className="text-lg font-bold text-white">{title}</h1>
        <p className="text-xs font-mono text-slate-500">{subtitle}</p>
      </div>

      {/* Right: Search + Bell + Avatar */}
      <div className="flex items-center gap-3">
        
        {/* Search bar */}
        <div className="relative hidden md:flex items-center">
          <Search size={14} className="absolute left-3 text-slate-500" />
          <input
            placeholder="Search cases, clients…"
            className="bg-slate-800/60 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-yellow-500/50 w-56 font-mono"
          />
        </div>

        {/* Notification bell */}
        <button className="relative w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 border border-slate-950" />
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-slate-950 text-xs font-bold">
            AK
          </div>
          <div className="hidden md:block">
            <p className="text-xs text-slate-200 font-medium">Adv. A. Kumar</p>
            <p className="text-[10px] font-mono text-slate-500">Senior Partner</p>
          </div>
        </div>
      </div>
    </header>
  )
}