import { useState } from 'react'
import Layout from '../../components/ui/Layout'
import { INVOICES } from '../../data/mockData'
import { CheckCircle2, Clock, AlertCircle, Download, Plus, IndianRupee } from 'lucide-react'

const STATUS_CONFIG = {
  Paid:    { icon: CheckCircle2, style: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', dot: 'bg-emerald-400' },
  Pending: { icon: Clock,        style: 'bg-amber-500/15  text-amber-300  border-amber-500/30',  dot: 'bg-amber-400'  },
  Overdue: { icon: AlertCircle,  style: 'bg-rose-500/15   text-rose-300   border-rose-500/30',   dot: 'bg-rose-400'   },
}

function SummaryCard({ label, value, sub, color }) {
  const colors = {
    green: 'border-emerald-500/30 text-emerald-400',
    amber: 'border-amber-500/30  text-amber-400',
    red:   'border-rose-500/30   text-rose-400',
    white: 'border-slate-700     text-white',
  }
  return (
    <div className={`rounded-2xl border bg-slate-900/80 p-5 ${colors[color].split(' ')[0]}`}>
      <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">{label}</p>
      <p className={`text-2xl font-bold ${colors[color].split(' ')[1]}`}>{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </div>
  )
}

export default function Billing() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const totalBilled  = INVOICES.reduce((s, i) => s + i.amount, 0)
  const totalPaid    = INVOICES.reduce((s, i) => s + i.paid, 0)
  const totalPending = INVOICES.filter(i => i.status === 'Pending').reduce((s, i) => s + i.amount, 0)
  const totalOverdue = INVOICES.filter(i => i.status === 'Overdue').reduce((s, i) => s + i.amount, 0)

  const filtered = filter === 'All' ? INVOICES : INVOICES.filter(i => i.status === filter)

  return (
    <Layout title="Billing & Invoices" subtitle={`${INVOICES.length} invoices · ₹${totalBilled.toLocaleString()} total billed`}>
      <div className="p-6 max-w-7xl mx-auto space-y-6">

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard label="Total Billed"   value={`₹${totalBilled.toLocaleString()}`}  color="white" />
          <SummaryCard label="Received"       value={`₹${totalPaid.toLocaleString()}`}    sub={`${Math.round(totalPaid/totalBilled*100)}% collected`} color="green" />
          <SummaryCard label="Pending"        value={`₹${totalPending.toLocaleString()}`} sub={`${INVOICES.filter(i=>i.status==='Pending').length} invoices`} color="amber" />
          <SummaryCard label="Overdue"        value={`₹${totalOverdue.toLocaleString()}`} sub="Action needed" color="red" />
        </div>

        {/* Filter Tabs + New Invoice */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 bg-slate-800/60 border border-slate-700 rounded-xl p-1">
            {['All', 'Paid', 'Pending', 'Overdue'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all
                  ${filter === tab
                    ? 'bg-yellow-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
              >{tab}</button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-sm px-4 py-2 rounded-xl transition-colors">
            <Plus size={16} /> New Invoice
          </button>
        </div>

        {/* Invoice Table */}
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['Invoice','Client','Description','Amount','Due Date','Status',''].map(h => (
                  <th key={h} className="px-6 py-3.5 text-left text-xs font-mono uppercase tracking-wider text-slate-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => {
                const cfg = STATUS_CONFIG[inv.status]
                const StatusIcon = cfg.icon
                return (
                  <tr key={inv.id} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-yellow-500">{inv.id}</td>
                    <td className="px-6 py-4 text-slate-200 font-medium">{inv.client}</td>
                    <td className="px-6 py-4 text-slate-400 text-xs max-w-48 truncate">{inv.description}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-slate-200 font-semibold">₹{inv.amount.toLocaleString()}</p>
                        {inv.status !== 'Paid' && inv.paid > 0 && (
                          <p className="text-[11px] font-mono text-emerald-400">₹{inv.paid.toLocaleString()} paid</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-400">{inv.due}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border ${cfg.style}`}>
                        <StatusIcon size={11} />
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelected(inv)}
                        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                        title="View / Download"
                      >
                        <Download size={13} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Invoice Preview Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
               onClick={() => setSelected(null)}>
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-8 shadow-2xl"
                 onClick={e => e.stopPropagation()}>

              {/* Receipt Header */}
              <div className="text-center mb-6 pb-6 border-b border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center mx-auto mb-3">
                  <IndianRupee size={22} className="text-slate-950" />
                </div>
                <h2 className="text-xl font-bold text-white">LexDesk Law Chambers</h2>
                <p className="text-xs text-slate-500 font-mono mt-1">123 High Court Road, Chennai — 600001</p>
              </div>

              {/* Invoice details */}
              <div className="space-y-2 mb-6">
                {[
                  ['Invoice No',   selected.id],
                  ['Client',       selected.client],
                  ['Case',         selected.caseId],
                  ['Description',  selected.description],
                  ['Invoice Date', selected.date],
                  ['Due Date',     selected.due],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between py-1.5 border-b border-slate-800">
                    <span className="text-xs font-mono text-slate-500">{l}</span>
                    <span className="text-xs text-slate-200">{v}</span>
                  </div>
                ))}
              </div>

              {/* Amount */}
              <div className="bg-slate-800/60 rounded-xl p-4 mb-5">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-400">Amount</span>
                  <span className="text-sm text-white font-semibold">₹{selected.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-3">
                  <span className="text-sm text-slate-400">Paid</span>
                  <span className="text-sm text-emerald-400 font-semibold">₹{selected.paid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-700">
                  <span className="text-sm font-bold text-white">Balance Due</span>
                  <span className={`text-sm font-bold ${selected.amount - selected.paid > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    ₹{(selected.amount - selected.paid).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-mono border ${STATUS_CONFIG[selected.status].style}`}>
                  {selected.status}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setSelected(null)}
                    className="px-4 py-2 rounded-xl border border-slate-700 text-sm text-slate-400 hover:text-white hover:border-slate-600 transition-colors font-mono">
                    Close
                  </button>
                  <button className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-sm transition-colors">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  )
}