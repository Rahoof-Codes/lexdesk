import Layout from '../../components/ui/Layout'
import { CASES, HEARINGS, METRICS } from '../../data/mockData'
import { TrendingUp, TrendingDown, Briefcase, Calendar, Receipt, AlertTriangle } from 'lucide-react'

// ── Metric Card ──────────────────────────────────────────────────────
function MetricCard({ label, value, sub, trend, icon: Icon, color }) {
  const colors = {
    yellow: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
    amber:  'border-amber-500/30  bg-amber-500/10  text-amber-400',
    green:  'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    red:    'border-rose-500/30   bg-rose-500/10   text-rose-400',
  }
  return (
    <div className={`rounded-2xl border bg-slate-900/80 p-5 hover:scale-[1.02] transition-transform duration-300 ${colors[color].split(' ')[0]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          <div className="flex items-center gap-1.5 mt-2">
            {trend === 'up'
              ? <TrendingUp size={13} className="text-emerald-400" />
              : <TrendingDown size={13} className="text-rose-400" />
            }
            <span className="text-xs text-slate-400">{sub}</span>
          </div>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[color].split(' ').slice(1).join(' ')}`}>
          <Icon size={18} />
        </div>
      </div>
    </div>
  )
}

// ── Status Badge ─────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    'Hearing Scheduled': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    'Document Review':   'bg-sky-500/15   text-sky-300   border-sky-500/30',
    'Awaiting Evidence': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    'Judgment Awaited':  'bg-slate-500/15 text-slate-300 border-slate-500/30',
    'Bail Hearing':      'bg-rose-500/15  text-rose-300  border-rose-500/30',
  }
  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-mono border ${map[status]}`}>
      {status}
    </span>
  )
}

// ── Main Page ────────────────────────────────────────────────────────
export default function Dashboard() {
  return (
    <Layout
      title="Advocate Dashboard"
      subtitle="Wednesday, April 29, 2025 · 2 hearings today"
    >
      <div className="p-6 space-y-6 max-w-7xl mx-auto">

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Active Cases"     value={METRICS.activeCases}     sub="+3 this week"  trend="up"   icon={Briefcase}     color="yellow" />
          <MetricCard label="Pending Hearings" value={METRICS.pendingHearings}  sub="Next: Apr 30"  trend="up"   icon={Calendar}      color="amber"  />
          <MetricCard label="Billed (Apr)"     value={METRICS.billedThisMonth}  sub="+18% vs Mar"   trend="up"   icon={Receipt}       color="green"  />
          <MetricCard label="Overdue Payments" value={METRICS.overdueAmount}    sub="4 clients"     trend="down" icon={AlertTriangle}  color="red"    />
        </div>

        {/* Cases Table + Hearings */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Cases Table */}
          <div className="xl:col-span-2 rounded-2xl border border-slate-700/60 bg-slate-900/80 overflow-hidden">
            <div className="px-6 pt-5 pb-3 flex justify-between items-center">
              <h2 className="text-sm font-mono uppercase tracking-widest text-slate-400">Active Cases</h2>
              <button className="text-xs text-yellow-500 hover:text-yellow-300 font-mono">View All →</button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-t border-b border-slate-800">
                  {['Case ID','Client','Type','Status','Next Date'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-slate-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CASES.map(c => (
                  <tr key={c.id} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${c.priority==='high'?'bg-rose-400':c.priority==='medium'?'bg-amber-400':'bg-emerald-400'}`} />
                        <span className="font-mono text-xs text-yellow-500">{c.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-200 font-medium">{c.client}</td>
                    <td className="px-6 py-4 text-slate-400 text-xs">{c.type}</td>
                    <td className="px-6 py-4"><StatusBadge status={c.status} /></td>
                    <td className="px-6 py-4 text-slate-400 text-xs font-mono">{c.nextDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Hearing Timeline */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6">
            <h2 className="text-sm font-mono uppercase tracking-widest text-slate-400 mb-4">Upcoming Hearings</h2>
            <div className="space-y-1">
              {HEARINGS.map((h, i) => (
                <div key={i} className="flex gap-4 items-start py-3 border-b border-slate-800/50 last:border-0">
                  <div className="text-right w-20 shrink-0">
                    <p className="text-xs font-mono text-slate-400">{h.time}</p>
                    <span className={`mt-1 inline-block px-2 py-0.5 rounded text-[10px] font-mono
                      ${h.day==='Today'   ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        h.day==='Tomorrow'? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                                            'text-slate-600'}`}>
                      {h.day}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 pt-0.5">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
                    {i < HEARINGS.length - 1 && <div className="w-px h-8 bg-slate-700" />}
                  </div>
                  <div>
                    <p className="text-sm text-slate-200">{h.court}</p>
                    <p className="text-xs text-slate-500 font-mono">{h.caseId} · {h.client}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}