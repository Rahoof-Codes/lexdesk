import { useState, useRef } from 'react'
import Layout from '../../components/ui/Layout'
import { DOCUMENTS } from '../../data/mockData'
import { Upload, Search, FileText, Download, Trash2, ShieldCheck, FolderOpen } from 'lucide-react'

const TYPE_COLORS = {
  PDF:  { text: 'text-rose-400',   bg: 'bg-rose-500/10',   border: 'border-rose-500/20'   },
  DOCX: { text: 'text-sky-400',    bg: 'bg-sky-500/10',    border: 'border-sky-500/20'    },
  ZIP:  { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  IMG:  { text: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/20'},
}

function FileCard({ doc, onDelete }) {
  const tc = TYPE_COLORS[doc.type] || TYPE_COLORS.PDF
  return (
    <div className={`rounded-2xl border ${tc.border} bg-slate-900/80 p-5 hover:scale-[1.01] transition-all group`}>
      {/* Type icon */}
      <div className={`w-12 h-12 rounded-xl ${tc.bg} flex items-center justify-center mb-4`}>
        <FileText size={22} className={tc.text} />
      </div>

      {/* Name */}
      <p className="text-sm text-slate-200 font-medium truncate group-hover:text-white transition-colors mb-1">
        {doc.name}
      </p>

      {/* Meta */}
      <div className="space-y-1 mb-4">
        <p className="text-xs font-mono text-slate-500">{doc.caseId} · {doc.size}</p>
        <p className="text-xs font-mono text-slate-600">Uploaded {doc.date} by {doc.uploader}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl ${tc.bg} ${tc.text} text-xs font-mono hover:opacity-80 transition-opacity`}>
          <Download size={13} /> Download
        </button>
        <button
          onClick={() => onDelete(doc.id)}
          className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 hover:text-rose-400 hover:border-rose-500/30 transition-colors"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  )
}

export default function Vault() {
  const [docs, setDocs]       = useState(DOCUMENTS)
  const [search, setSearch]   = useState('')
  const [typeFilter, setType] = useState('All')
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef()

  const filtered = docs.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
                     || d.caseId.toLowerCase().includes(search.toLowerCase())
    const matchType   = typeFilter === 'All' || d.type === typeFilter
    return matchSearch && matchType
  })

  // Simulate file upload
  function handleFiles(files) {
    const newDocs = Array.from(files).map((f, i) => {
      const ext = f.name.split('.').pop().toUpperCase()
      return {
        id:       `DOC-${Date.now()}-${i}`,
        name:     f.name,
        size:     `${(f.size / 1024 / 1024).toFixed(1)} MB`,
        date:     'Today',
        type:     ['PDF','DOCX','ZIP'].includes(ext) ? ext : 'PDF',
        caseId:   'Unassigned',
        uploader: 'Adv. Kumar',
      }
    })
    setDocs(prev => [...newDocs, ...prev])
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  function handleDelete(id) {
    setDocs(prev => prev.filter(d => d.id !== id))
  }

  const totalSize = docs.reduce((s, d) => {
    const mb = parseFloat(d.size)
    return s + (isNaN(mb) ? 0 : mb)
  }, 0)

  return (
    <Layout title="Document Vault" subtitle={`${docs.length} files · ${totalSize.toFixed(1)} MB used`}>
      <div className="p-6 max-w-7xl mx-auto space-y-6">

        {/* Security Banner */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 px-5 py-3 flex items-center gap-3">
          <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
          <p className="text-sm text-emerald-300 font-mono">
            All documents are encrypted at rest (AES-256) and in transit (TLS 1.3). Access is logged for compliance.
          </p>
        </div>

        {/* Upload Drop Zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          className={`rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all
            ${dragging
              ? 'border-yellow-500 bg-yellow-500/10'
              : 'border-slate-700 bg-slate-900/40 hover:border-yellow-500/50 hover:bg-slate-800/40'
            }`}
        >
          <input
            ref={fileInputRef}
            type="file" multiple className="hidden"
            onChange={e => handleFiles(e.target.files)}
          />
          <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-4">
            <Upload size={24} className={dragging ? 'text-yellow-500' : 'text-slate-500'} />
          </div>
          <p className="text-slate-300 font-medium mb-1">
            {dragging ? 'Release to upload' : 'Drag & drop files here'}
          </p>
          <p className="text-xs text-slate-500 font-mono">
            or click to browse · PDF, DOCX, ZIP, Images supported
          </p>
        </div>

        {/* Search + Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex items-center">
            <Search size={14} className="absolute left-3 text-slate-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search files or case ID…"
              className="bg-slate-800/60 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-yellow-500/50 w-64 font-mono"
            />
          </div>
          <div className="flex gap-1 bg-slate-800/60 border border-slate-700 rounded-xl p-1">
            {['All','PDF','DOCX','ZIP'].map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all
                  ${typeFilter === t
                    ? 'bg-yellow-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
              >{t}</button>
            ))}
          </div>
        </div>

        {/* File Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <FolderOpen size={40} className="text-slate-700 mx-auto" />
            <p className="text-slate-600 font-mono">No documents found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(doc => (
              <FileCard key={doc.id} doc={doc} onDelete={handleDelete} />
            ))}
          </div>
        )}

      </div>
    </Layout>
  )
}