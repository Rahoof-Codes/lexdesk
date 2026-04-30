import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/ui/Layout'
import { CASES } from '../../data/mockData'
import { Search, Filter, Plus, ChevronRight } from 'lucide-react'

const STATUS_STYLES = {
  'Hearing Scheduled': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  'Document Review':   'bg-sky-500/15   text-sky-300   border-sky-500/30',
  'Awaiting Evidence': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  'Judgment Awaited':  'bg-slate-500/15 text-slate-300 border-slate-500/30',
  'Bail Hearing':      'bg-rose-500/15  text-rose-300  border-rose-500/30',
}

const PRIORITY_COLORS = {
  high:   'bg-rose-400',
  medium: 'bg-amber-400',
  low:    'bg-emerald-400',
}

const ALL_TYPES = ['All', ...new Set(CASES.map(c => c.type))]

export default function Cases() {
  const navigate = useNavigate()
  const [search, setSearch]     = useState('')
  const [typeFilter, setType]   = useState('All')
  const [sortBy, setSortBy]     = useState('nextDate')

  // Filter + sort logic
  const filtered = CASES
    .filter(c => {
      const matchSearch = c.client.toLowerCase().includes(search.toLowerCase())
                       || c.id.toLowerCase().includes(search.toLowerCase())
      const matchType   = typeFilter === 'All' || c.type === typeFilter
      return matchSearch && matchType
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const order = { high: 0, medium: 1, low: 2 }
        return order[a.priority] - order[b.priority]
      }
      return a.client.localeCompare(b.client)
    })

  return (
    <Layout title="Case Management" subtitle={`${CASES.length} active cases`}>
      <div className="p-6 max-w-7xl mx-auto space-y-5">

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          
          {/* Search */}
          <div className="relative flex items-center">
            <Search size={14} className="absolute left-3 text-slate-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by client or case ID…"
              className="bg-slate-800/60 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-yellow-500/50 w-72 font-mono"
            />
          </div>

          <div className="flex gap-2">
            {/* Type filter */}
            <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700 rounded-xl px-3 py-2">
              <Filter size={13} className="text-slate-500" />
              <select
                value={typeFilter}
                onChange={e => setType(e.target.value)}
                className="bg-transparent text-sm text-slate-300 font-mono focus:outline-none cursor-pointer"
              >
                {ALL_TYPES.map(t => <option key={t} value={t} className="bg-slate-900">{t}</option>)}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700 rounded-xl px-3 py-2">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-transparent text-sm text-slate-300 font-mono focus:outline-none cursor-pointer"
              >
                <option value="nextDate" className="bg-slate-900">Sort: Date</option>
                <option value="priority" className="bg-slate-900">Sort: Priority</option>
                <option value="client"   className="bg-slate-900">Sort: Client</option>
              </select>
            </div>

            {/* New Case button */}
            <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-sm px-4 py-2 rounded-xl transition-colors">
              <Plus size={16} />
              New Case
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {['All', 'high', 'medium', 'low'].map((p, i) => {
            const count = p === 'All' ? CASES.length : CASES.filter(c => c.priority === p).length
            const colors = { high:'text-rose-400', medium:'text-amber-400', low:'text-emerald-400', All:'text-white' }
            return (
              <div key={p} className="rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-center">
                <p className={`text-xl font-bold ${colors[p]}`}>{count}</p>
                <p className="text-[10px] font-mono text-slate-500 uppercase mt-0.5">
                  {p === 'All' ? 'Total' : `${p} priority`}
                </p>
              </div>
            )
          })}
        </div>

        {/* Cases List */}
        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-600 font-mono">
              No cases match your search.
            </div>
          )}

          {filtered.map(c => (
            <div
              key={c.id}
              onClick={() => navigate(`/cases/${c.id}`)}
              className="flex items-center gap-4 rounded-2xl border border-slate-700/60 bg-slate-900/80 px-6 py-4 hover:border-yellow-500/30 hover:bg-slate-800/60 cursor-pointer transition-all group"
            >
              {/* Priority dot */}
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${PRIORITY_COLORS[c.priority]}`} />

              {/* Case ID */}
              <span className="font-mono text-xs text-yellow-500 w-24 shrink-0">{c.id}</span>

              {/* Client + type */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{c.client}</p>
                <p className="text-xs text-slate-500 font-mono">{c.type} · {c.court}</p>
              </div>

              {/* Status badge */}
              <span className={`hidden sm:inline-flex px-2.5 py-1 rounded-md text-xs font-mono border ${STATUS_STYLES[c.status]}`}>
                {c.status}
              </span>

              {/* Next date */}
              <div className="text-right hidden md:block w-28 shrink-0">
                <p className="text-xs font-mono text-slate-400">{c.nextDate}</p>
                <p className="text-[10px] text-slate-600">Next hearing</p>
              </div>

              <ChevronRight size={16} className="text-slate-600 group-hover:text-yellow-500 transition-colors shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}