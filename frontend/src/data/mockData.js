export const CASES = [
  {
    id: 'CAS-2401', client: 'Ramesh Iyer', type: 'Civil Dispute',
    status: 'Hearing Scheduled', nextDate: 'Apr 30, 2025',
    priority: 'high', court: 'District Court I', judge: 'Hon. S. Krishnan',
    filedDate: 'Jan 12, 2025', retainer: 25000, paid: 25000,
    description: 'Dispute over commercial property boundary encroachment in Coimbatore. Plaintiff seeks injunction and damages of ₹8.5L.',
    notes: [
      { date: 'Apr 25', text: 'Client confirmed witnesses available for hearing.' },
      { date: 'Apr 20', text: 'Property survey report received. Favorable to client.' },
      { date: 'Apr 10', text: 'Opposing counsel requested 2-week adjournment. Denied.' },
    ],
    documents: ['Property_Deed_Iyer.pdf', 'Survey_Report.pdf', 'Notice_Copy.pdf'],
    timeline: [
      { date: 'Jan 12', event: 'Case Filed' },
      { date: 'Feb 3',  event: 'First Hearing' },
      { date: 'Mar 15', event: 'Evidence Submitted' },
      { date: 'Apr 30', event: 'Hearing Scheduled', upcoming: true },
    ]
  },
  {
    id: 'CAS-2398', client: 'Priya Natarajan', type: 'Property Law',
    status: 'Document Review', nextDate: 'May 3, 2025',
    priority: 'medium', court: 'City Civil Court', judge: 'Hon. R. Anand',
    filedDate: 'Feb 5, 2025', retainer: 18000, paid: 12000,
    description: 'Sale deed dispute involving undisclosed encumbrances on residential plot in Chennai.',
    notes: [
      { date: 'Apr 22', text: 'Received original title documents from client.' },
      { date: 'Apr 15', text: 'Encumbrance certificate analysis pending.' },
    ],
    documents: ['FIR_Copy_Natarajan.pdf', 'Title_Deed.pdf'],
    timeline: [
      { date: 'Feb 5',  event: 'Case Filed' },
      { date: 'Mar 10', event: 'Preliminary Hearing' },
      { date: 'May 3',  event: 'Document Review Hearing', upcoming: true },
    ]
  },
  {
    id: 'CAS-2391', client: 'Arjun Mehta', type: 'Corporate Litigation',
    status: 'Awaiting Evidence', nextDate: 'May 8, 2025',
    priority: 'medium', court: 'High Court', judge: 'Hon. P. Subramaniam',
    filedDate: 'Dec 20, 2024', retainer: 75000, paid: 45000,
    description: 'Shareholder dispute involving alleged misappropriation of company funds in a Pvt. Ltd. entity.',
    notes: [
      { date: 'Apr 18', text: 'Forensic auditor report awaited from opposing party.' },
    ],
    documents: ['Evidence_Bundle_Mehta.zip', 'MOA_Copy.pdf'],
    timeline: [
      { date: 'Dec 20', event: 'Case Filed' },
      { date: 'Jan 28', event: 'Admitted by Court' },
      { date: 'May 8',  event: 'Evidence Hearing', upcoming: true },
    ]
  },
  {
    id: 'CAS-2384', client: 'Sunita Reddy', type: 'Family Court',
    status: 'Judgment Awaited', nextDate: 'May 12, 2025',
    priority: 'low', court: 'Family Court III', judge: 'Hon. M. Devi',
    filedDate: 'Nov 10, 2024', retainer: 12000, paid: 12000,
    description: 'Mutual consent divorce petition with child custody arrangement.',
    notes: [
      { date: 'Apr 5', text: 'Arguments concluded. Judgment reserved.' },
    ],
    documents: ['Marriage_Certificate.pdf', 'Custody_Agreement_Draft.docx'],
    timeline: [
      { date: 'Nov 10', event: 'Petition Filed' },
      { date: 'Dec 15', event: 'Counselling Session' },
      { date: 'Apr 5',  event: 'Arguments Heard' },
      { date: 'May 12', event: 'Judgment', upcoming: true },
    ]
  },
  {
    id: 'CAS-2379', client: 'Vikram Sinha', type: 'Criminal Defense',
    status: 'Bail Hearing', nextDate: 'May 15, 2025',
    priority: 'high', court: 'Sessions Court', judge: 'Hon. K. Rajan',
    filedDate: 'Apr 1, 2025', retainer: 100000, paid: 50000,
    description: 'Anticipatory bail application for client accused under IPC 420 and 467 (cheating and forgery).',
    notes: [
      { date: 'Apr 26', text: 'Surety documents arranged. Two sureties confirmed.' },
      { date: 'Apr 20', text: 'Drafted bail application. Filed with court registry.' },
    ],
    documents: ['Bail_Application_Sinha.docx', 'FIR_Section_Charge.pdf'],
    timeline: [
      { date: 'Apr 1',  event: 'FIR Registered' },
      { date: 'Apr 8',  event: 'Client Consultation' },
      { date: 'Apr 20', event: 'Bail Application Filed' },
      { date: 'May 15', event: 'Bail Hearing', upcoming: true },
    ]
  },
]

export const HEARINGS = [
  { time: '9:30 AM',  court: 'District Court I',  caseId: 'CAS-2401', client: 'Ramesh Iyer',  day: 'Today'    },
  { time: '2:00 PM',  court: 'High Court',        caseId: 'CAS-2379', client: 'Vikram Sinha', day: 'Today'    },
  { time: '11:00 AM', court: 'Family Court III',  caseId: 'CAS-2384', client: 'Sunita Reddy', day: 'Tomorrow' },
  { time: '3:30 PM',  court: 'District Court II', caseId: 'CAS-2391', client: 'Arjun Mehta',  day: 'May 3'    },
]

export const INVOICES = [
  { id: 'INV-1041', caseId: 'CAS-2401', client: 'Ramesh Iyer',     amount: 25000, paid: 25000, status: 'Paid',    date: 'Apr 20, 2025', due: 'Apr 30, 2025', description: 'Retainer fee — Civil Dispute'       },
  { id: 'INV-1042', caseId: 'CAS-2391', client: 'Arjun Mehta',     amount: 30000, paid: 0,     status: 'Pending', date: 'Apr 22, 2025', due: 'May 5, 2025',  description: 'Second tranche — Corporate Litigation' },
  { id: 'INV-1043', caseId: 'CAS-2398', client: 'Priya Natarajan', amount: 6000,  paid: 0,     status: 'Overdue', date: 'Apr 10, 2025', due: 'Apr 20, 2025', description: 'Balance retainer — Property Law'    },
  { id: 'INV-1044', caseId: 'CAS-2384', client: 'Sunita Reddy',    amount: 8500,  paid: 8500,  status: 'Paid',    date: 'Apr 26, 2025', due: 'Apr 28, 2025', description: 'Full settlement — Family Court'     },
  { id: 'INV-1045', caseId: 'CAS-2379', client: 'Vikram Sinha',    amount: 50000, paid: 0,     status: 'Pending', date: 'Apr 28, 2025', due: 'May 10, 2025', description: 'Criminal defense — first tranche'   },
]

export const DOCUMENTS = [
  { id: 'DOC-001', name: 'Property_Deed_Iyer.pdf',      size: '2.4 MB',  date: 'Apr 28', type: 'PDF',  caseId: 'CAS-2401', uploader: 'Adv. Kumar'   },
  { id: 'DOC-002', name: 'Bail_Application_Sinha.docx', size: '840 KB',  date: 'Apr 27', type: 'DOCX', caseId: 'CAS-2379', uploader: 'Adv. Kumar'   },
  { id: 'DOC-003', name: 'Evidence_Bundle_Mehta.zip',   size: '18.2 MB', date: 'Apr 25', type: 'ZIP',  caseId: 'CAS-2391', uploader: 'Arjun Mehta'  },
  { id: 'DOC-004', name: 'FIR_Copy_Natarajan.pdf',      size: '1.1 MB',  date: 'Apr 24', type: 'PDF',  caseId: 'CAS-2398', uploader: 'Priya Natarajan'},
  { id: 'DOC-005', name: 'Survey_Report.pdf',           size: '3.8 MB',  date: 'Apr 22', type: 'PDF',  caseId: 'CAS-2401', uploader: 'Court Registry'},
  { id: 'DOC-006', name: 'Custody_Agreement_Draft.docx',size: '512 KB',  date: 'Apr 20', type: 'DOCX', caseId: 'CAS-2384', uploader: 'Adv. Kumar'   },
]

export const METRICS = {
  activeCases:     47,
  pendingHearings: 12,
  billedThisMonth: '₹2.4L',
  overdueAmount:   '₹38K',
}