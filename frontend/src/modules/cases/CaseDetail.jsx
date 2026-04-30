import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../components/ui/Layout'
import { CASES } from '../../data/mockData'
import { ArrowLeft, FileText, StickyNote, Clock, IndianRupee, CheckCircle2, Circle } from 'lucide-react'

const STATUS_STYLES = {
  'Hearing Scheduled': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  'Document Review':   'bg-sky-500/15   text-sky-300   border-sky-500/30',
  'Awaiting Evidence': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  'Judgment Awaited':  'bg-slate-500/15 text-slate-300 border-slate-500/30',
  'Bail Hearing':      'bg-rose-500/15  text-rose-300  border-rose-500/30',
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between py-2.5 border-b border-slate-800 last:border-0">
      <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">{label}</span>
      <span className="text-sm text-slate-200 font-medium">{value}</span>
    </div>
  )
}

export default function CaseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const c = CASES.find(x => x.id === id)

  // If case not found
  if (!c) return (
    <Layout title="Case Not Found" subtitle="">
      <div className="p-8 text-slate-500 font-mono">
        Case {id} does not exist.
        <button onClick={() => navigate('/cases')} className="ml-4 text-yellow-500 hover:underline">← Back</button>
      </div>
    </Layout>
  )

  const paidPct = Math.round((c.paid / c.retainer) * 100)

  return (
    <Layout title={c.id} subtitle={`${c.client} · ${c.type}`}>
      <div className="p-6 max-w-7xl mx-auto space-y-6">

        {/* Back + Header */}
        <div className="flex items-start gap-4">
          <button
            onClick={() => navigate('/cases')}
            className="mt-1 w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-white">{c.client}</h1>
              <span className={`px-3 py-1 rounded-lg text-xs font-mono border ${STATUS_STYLES[c.status]}`}>{c.status}</span>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${
                c.priority === 'high'   ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' :
                c.priority === 'medium' ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' :
                                          'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
              }`}>{c.priority} priority</span>
            </div>
            <p className="text-sm text-slate-400 font-mono">{c.description}</p>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left col — case info + financials */}
          <div className="space-y-5">

            {/* Case Info */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-5">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">Case Details</h3>
              <InfoRow label="Case ID"    value={c.id} />
              <InfoRow label="Type"       value={c.type} />
              <InfoRow label="Court"      value={c.court} />
              <InfoRow label="Judge"      value={c.judge} />
              <InfoRow label="Filed"      value={c.filedDate} />
              <InfoRow label="Next Date"  value={c.nextDate} />
            </div>

            {/* Financials */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-5">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">Financials</h3>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-mono text-slate-500">Retainer</span>
                <span className="text-sm font-bold text-white">₹{c.retainer.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-xs font-mono text-slate-500">Paid</span>
                <span className="text-sm font-semibold text-emerald-400">₹{c.paid.toLocaleString()}</span>
              </div>
              {/* Progress bar */}
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-1">
                <div
                  className="h-full bg-linear-to-r from-yellow-500 to-amber-400 rounded-full transition-all duration-700"
                  style={{ width: `${paidPct}%` }}
                />
              </div>
              <p className="text-[11px] font-mono text-slate-600 text-right">{paidPct}% paid</p>
              {c.paid < c.retainer && (
                <p className="mt-2 text-xs font-mono text-rose-400">
                  Balance: ₹{(c.retainer - c.paid).toLocaleString()} pending
                </p>
              )}
            </div>
          </div>

          {/* Middle col — timeline + notes */}
          <div className="space-y-5">

            {/* Timeline */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-5">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
                <Clock size={12} className="inline mr-1.5" />Case Timeline
              </h3>
              <div className="space-y-1">
                {c.timeline.map((t, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="flex flex-col items-center gap-1 pt-0.5">
                      {t.upcoming
                        ? <Circle size={14} className="text-yellow-500 shrink-0" />
                        : <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      }
                      {i < c.timeline.length - 1 && <div className="w-px h-6 bg-slate-700" />}
                    </div>
                    <div className="pb-2">
                      <p className={`text-sm ${t.upcoming ? 'text-yellow-400 font-semibold' : 'text-slate-300'}`}>
                        {t.event}
                        {t.upcoming && <span className="ml-2 text-[10px] font-mono bg-yellow-500/20 text-yellow-500 px-1.5 py-0.5 rounded">Upcoming</span>}
                      </p>
                      <p className="text-xs font-mono text-slate-600">{t.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500">
                  <StickyNote size={12} className="inline mr-1.5" />Notes
                </h3>
                <button className="text-xs font-mono text-yellow-500 hover:text-yellow-300">+ Add</button>
              </div>
              <div className="space-y-3">
                {c.notes.map((n, i) => (
                  <div key={i} className="bg-slate-800/60 rounded-xl p-3">
                    <p className="text-xs text-slate-300 leading-relaxed">{n.text}</p>
                    <p className="text-[10px] font-mono text-slate-600 mt-1.5">{n.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right col — documents */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-5 h-fit">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500">
                <FileText size={12} className="inline mr-1.5" />Documents
              </h3>
              <button className="text-xs font-mono text-yellow-500 hover:text-yellow-300">+ Upload</button>
            </div>
            <div className="space-y-2">
              {c.documents.map((d, i) => {
                const ext = d.split('.').pop().toUpperCase()
                const extColor = { PDF:'text-rose-400', DOCX:'text-sky-400', ZIP:'text-purple-400' }[ext] || 'text-slate-400'
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer group">
                    <FileText size={15} className={extColor} />
                    <span className="text-xs text-slate-300 flex-1 truncate group-hover:text-white transition-colors">{d}</span>
                    <span className={`text-[10px] font-mono ${extColor}`}>{ext}</span>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}