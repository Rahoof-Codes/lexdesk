import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Briefcase, Receipt,
  FolderLock, Users, Calendar, Settings, LogOut, Scale
} from 'lucide-react'
import { useState } from 'react'

const NAV = [
  { to: '/',         icon: LayoutDashboard, label: 'Dashboard'     },
  { to: '/cases',    icon: Briefcase,       label: 'Cases'         },
  { to: '/billing',  icon: Receipt,         label: 'Billing'       },
  { to: '/vault',    icon: FolderLock,      label: 'Document Vault'},
  { to: '/clients',  icon: Users,           label: 'Client Portal' },
  { to: '/calendar', icon: Calendar,        label: 'Calendar'      },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`
      ${collapsed ? 'w-16' : 'w-60'} 
      transition-all duration-300 flex flex-col 
      bg-slate-950 border-r border-slate-800 
      h-screen sticky top-0 shrink-0
    `}>

      {/* Logo */}
      <div className="px-4 py-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center shrink-0">
          <Scale size={16} className="text-slate-950" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-bold text-white">LexDesk</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
              Advocate Suite
            </p>
          </div>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-xl 
              transition-all duration-200 group
              ${isActive
                ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25'
                : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/60'
              }
            `}
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && (
              <span className="text-sm font-mono truncate">{label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-800 p-3 space-y-0.5">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-slate-800/60 transition-colors">
          <Settings size={18} />
          {!collapsed && <span className="text-sm font-mono">Settings</span>}
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors">
          <LogOut size={18} />
          {!collapsed && <span className="text-sm font-mono">Sign Out</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-600 hover:text-slate-400 transition-colors mt-1 text-xs font-mono"
        >
          {collapsed ? '→' : '← Collapse'}
        </button>
      </div>
    </aside>
  )
}