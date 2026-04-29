export const CASES = [
  { id:'CAS-2401', client:'Ramesh Iyer',     type:'Civil Dispute',        status:'Hearing Scheduled', nextDate:'Apr 30, 2025', priority:'high'   },
  { id:'CAS-2398', client:'Priya Natarajan', type:'Property Law',         status:'Document Review',   nextDate:'May 3, 2025',  priority:'medium' },
  { id:'CAS-2391', client:'Arjun Mehta',     type:'Corporate Litigation', status:'Awaiting Evidence', nextDate:'May 8, 2025',  priority:'medium' },
  { id:'CAS-2384', client:'Sunita Reddy',    type:'Family Court',         status:'Judgment Awaited',  nextDate:'May 12, 2025', priority:'low'    },
  { id:'CAS-2379', client:'Vikram Sinha',    type:'Criminal Defense',     status:'Bail Hearing',      nextDate:'May 15, 2025', priority:'high'   },
]

export const HEARINGS = [
  { time:'9:30 AM',  court:'District Court I',  caseId:'CAS-2401', client:'Ramesh Iyer',  day:'Today'    },
  { time:'2:00 PM',  court:'High Court',        caseId:'CAS-2379', client:'Vikram Sinha', day:'Today'    },
  { time:'11:00 AM', court:'Family Court III',  caseId:'CAS-2384', client:'Sunita Reddy', day:'Tomorrow' },
  { time:'3:30 PM',  court:'District Court II', caseId:'CAS-2391', client:'Arjun Mehta',  day:'May 3'    },
]

export const INVOICES = [
  { id:'INV-1041', client:'Ramesh Iyer',     amount:25000, status:'Paid',    date:'Apr 20, 2025' },
  { id:'INV-1042', client:'Arjun Mehta',     amount:18000, status:'Pending', date:'Apr 22, 2025' },
  { id:'INV-1043', client:'Priya Natarajan', amount:12000, status:'Overdue', date:'Apr 10, 2025' },
  { id:'INV-1044', client:'Sunita Reddy',    amount:8500,  status:'Paid',    date:'Apr 26, 2025' },
  { id:'INV-1045', client:'Vikram Sinha',    amount:45000, status:'Pending', date:'Apr 28, 2025' },
]

export const DOCUMENTS = [
  { name:'Property_Deed_Iyer.pdf',      size:'2.4 MB', date:'Apr 28', type:'PDF',  caseId:'CAS-2401' },
  { name:'Bail_Application_Sinha.docx', size:'840 KB', date:'Apr 27', type:'DOCX', caseId:'CAS-2379' },
  { name:'Evidence_Bundle_Mehta.zip',   size:'18.2 MB',date:'Apr 25', type:'ZIP',  caseId:'CAS-2391' },
  { name:'FIR_Copy_Natarajan.pdf',      size:'1.1 MB', date:'Apr 24', type:'PDF',  caseId:'CAS-2398' },
]

export const METRICS = {
  activeCases:     47,
  pendingHearings: 12,
  billedThisMonth: '₹2.4L',
  overdueAmount:   '₹38K',
}