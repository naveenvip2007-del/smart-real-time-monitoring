const { useState, useEffect, useRef } = React;

// -------------------------------------------------------------
// CENTRAL DATA STORE (MOCK / SIMULATED PRODUCTION DATA)
// -------------------------------------------------------------
const USER_ROLES = {
  DEPARTMENT_OFFICIAL: {
    id: 'DEPARTMENT_OFFICIAL',
    name: 'Department Official (DoSJE)',
    designation: 'Joint Secretary / Central Vigilance Wing',
    badge: 'Central Hq - New Delhi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'js.vigilance@dosje.gov.in',
    permissions: ['all', 'view_cctv', 'trigger_call', 'assign_officers', 'view_anomalies', 'export_reports']
  },
  PMU_TEAM: {
    id: 'PMU_TEAM',
    name: 'PMU Team (Project Monitoring Unit)',
    designation: 'Senior Lead Data Analyst & Auditor',
    badge: 'State Monitoring Unit',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'pmu.audit@dosje.gov.in',
    permissions: ['view_cctv', 'view_anomalies', 'export_reports', 'analyze_data']
  },
  INSPECTION_OFFICER: {
    id: 'INSPECTION_OFFICER',
    name: 'Inspection Officer (Flying Squad)',
    designation: 'Special Vigilance Officer Grade-I',
    badge: 'North Zone Mobile Squad #04',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'officer.rajesh@vigilance.dosje.gov.in',
    permissions: ['conduct_inspection', 'view_assigned', 'submit_report', 'capture_evidence']
  },
  NGO_ADMIN: {
    id: 'NGO_ADMIN',
    name: 'NGO / Institute Administrator',
    designation: 'Director, Samarthya Welfare Society',
    badge: 'Registered NGO #UP-2018-8841',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'director@samarthya-ngo.org',
    permissions: ['view_own_institution', 'submit_compliance', 'view_own_cctv']
  },
  PROJECT_STAFF: {
    id: 'PROJECT_STAFF',
    name: 'Project Incharge / Staff',
    designation: 'Centre Superintendent & Hostel Warden',
    badge: 'Kanpur Rehab Unit',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    email: 'warden.kanpur@dosje-rehab.org',
    permissions: ['mark_daily_attendance', 'verify_ration', 'answer_video_call']
  },
  BENEFICIARY: {
    id: 'BENEFICIARY',
    name: 'Beneficiary / Citizen Representative',
    designation: 'Vocational Trainee & Resident',
    badge: 'UDID: UP-DDRS-90214',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    email: 'arjun.sharma@beneficiary.in',
    permissions: ['view_entitlements', 'submit_grievance']
  }
};

const SCHEMES = [
  { id: 'PM-AJAY', code: 'PMAJAY', name: 'PM Anusuchit Jaati Abhyuday Yojana', color: '#2563EB', activeCount: 382 },
  { id: 'SMILE', code: 'SMILE', name: 'Support for Marginalized Individuals for Livelihood & Enterprise', color: '#059669', activeCount: 214 },
  { id: 'AVYAY', code: 'AVYAY', name: 'Atal Vayo Abhyuday Yojana (Senior Citizens)', color: '#D97706', activeCount: 298 },
  { id: 'DDRS', code: 'DDRS', name: 'Deendayal Disabled Rehabilitation Scheme', color: '#7C3AED', activeCount: 345 },
  { id: 'NMBA', code: 'NMBA', name: 'Nasha Mukt Bharat Abhiyaan (IRCAs)', color: '#DC2626', activeCount: 189 }
];

const INITIAL_INSTITUTIONS = [
  {
    id: 'INST-UP-001',
    name: 'Samarthya Deendayal Special Education & Rehab',
    scheme: 'DDRS',
    type: 'Special School & Vocational Rehab',
    state: 'Uttar Pradesh',
    district: 'Kanpur Nagar',
    lat: 26.4499,
    lng: 80.3319,
    contactPerson: 'Dr. Rakesh Trivedi',
    phone: '+91 98390 12489',
    enrolledBeneficiaries: 145,
    todayAttendance: 132,
    staffCount: 18,
    complianceScore: 94.2,
    riskLevel: 'Low',
    lastInspectionDate: '2026-10-18',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'INST-DL-002',
    name: 'SMILE Rainbow Shelter & Transgender Skill Hub',
    scheme: 'SMILE',
    type: 'Shelter & Skill Empowerment Hub',
    state: 'Delhi',
    district: 'Central Delhi',
    lat: 28.6507,
    lng: 77.2334,
    contactPerson: 'Ms. Simran Kinnar',
    phone: '+91 98112 45890',
    enrolledBeneficiaries: 85,
    todayAttendance: 42,
    staffCount: 9,
    complianceScore: 68.4,
    riskLevel: 'High',
    lastInspectionDate: '2026-08-04',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'INST-UP-003',
    name: 'Kashi Ananda Vridhashram (Senior Citizens Care)',
    scheme: 'AVYAY',
    type: 'Senior Living & Assisted Healthcare Home',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    lat: 25.3176,
    lng: 82.9739,
    contactPerson: 'Swami Chinmay Das',
    phone: '+91 94152 77123',
    enrolledBeneficiaries: 60,
    todayAttendance: 58,
    staffCount: 12,
    complianceScore: 96.8,
    riskLevel: 'Low',
    lastInspectionDate: '2026-11-02',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'INST-MH-004',
    name: 'Jeevan Jyoti Integrated Rehab Centre (IRCA)',
    scheme: 'NMBA',
    type: 'Substance De-Addiction & Counseling',
    state: 'Maharashtra',
    district: 'Pune',
    lat: 18.5204,
    lng: 73.8567,
    contactPerson: 'Dr. Anand Joshi',
    phone: '+91 98220 90456',
    enrolledBeneficiaries: 50,
    todayAttendance: 31,
    staffCount: 14,
    complianceScore: 74.5,
    riskLevel: 'Medium',
    lastInspectionDate: '2026-09-12',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'INST-MH-005',
    name: 'Dr. B.R. Ambedkar Residential High School & Hostel',
    scheme: 'PM-AJAY',
    type: 'Hostel & Residential Academy for SCs',
    state: 'Maharashtra',
    district: 'Nagpur',
    lat: 21.1458,
    lng: 79.0882,
    contactPerson: 'Prof. Milind Meshram',
    phone: '+91 97654 32189',
    enrolledBeneficiaries: 220,
    todayAttendance: 212,
    staffCount: 22,
    complianceScore: 91.0,
    riskLevel: 'Low',
    lastInspectionDate: '2026-10-25',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'INST-RJ-006',
    name: 'Aanchal Destitute Senior Citizen Haven',
    scheme: 'AVYAY',
    type: 'Destitute Elders Ashram',
    state: 'Rajasthan',
    district: 'Jaipur',
    lat: 26.9124,
    lng: 75.7873,
    contactPerson: 'Smt. Shashi Shekhawat',
    phone: '+91 94140 66321',
    enrolledBeneficiaries: 75,
    todayAttendance: 48,
    staffCount: 11,
    complianceScore: 62.1,
    riskLevel: 'High',
    lastInspectionDate: '2026-07-19',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&auto=format&fit=crop&q=80'
  }
];

const INITIAL_CCTV = [
  {
    id: 'CAM-UP01-01',
    institutionId: 'INST-UP-001',
    institutionName: 'Samarthya Deendayal Special Education',
    scheme: 'DDRS',
    name: 'Main Gate & Biometric Turnstile',
    zone: 'Entrance & Security Gate',
    status: 'Online',
    fps: 30,
    resolution: '1080p FHD',
    bitrate: '2.4 Mbps',
    personsDetected: 4,
    coords: '26.4499° N, 80.3319° E'
  },
  {
    id: 'CAM-UP01-02',
    institutionId: 'INST-UP-001',
    institutionName: 'Samarthya Deendayal Special Education',
    scheme: 'DDRS',
    name: 'Mid-Day Dining & Nutrition Hall',
    zone: 'Dining & Kitchen',
    status: 'Online',
    fps: 30,
    resolution: '1080p FHD',
    bitrate: '3.1 Mbps',
    personsDetected: 24,
    coords: '26.4499° N, 80.3319° E'
  },
  {
    id: 'CAM-DL02-01',
    institutionId: 'INST-DL-002',
    institutionName: 'SMILE Rainbow Shelter & Hub',
    scheme: 'SMILE',
    name: 'Vocational Stitching Room',
    zone: 'Training Workshop',
    status: 'Online',
    fps: 24,
    resolution: '720p HD',
    bitrate: '1.2 Mbps',
    personsDetected: 6,
    coords: '28.6507° N, 77.2334° E'
  },
  {
    id: 'CAM-DL02-02',
    institutionId: 'INST-DL-002',
    institutionName: 'SMILE Rainbow Shelter & Hub',
    scheme: 'SMILE',
    name: 'Main Perimeter Entrance',
    zone: 'Perimeter Wall',
    status: 'Offline',
    fps: 0,
    resolution: 'Disconnected',
    bitrate: '0 Kbps',
    personsDetected: 0,
    coords: '28.6507° N, 77.2334° E'
  },
  {
    id: 'CAM-RJ06-01',
    institutionId: 'INST-RJ-006',
    institutionName: 'Aanchal Destitute Senior Haven',
    scheme: 'AVYAY',
    name: 'Dormitory Hall East Block',
    zone: 'Living Quarters',
    status: 'Tampered',
    fps: 10,
    resolution: 'Angle Shift',
    bitrate: '380 Kbps',
    personsDetected: 1,
    coords: '26.9124° N, 75.7873° E'
  }
];

const INITIAL_ASSIGNMENTS = [
  {
    id: 'ASN-2026-904',
    institutionId: 'INST-DL-002',
    institutionName: 'SMILE Rainbow Shelter & Hub',
    scheme: 'SMILE',
    assignedOfficerName: 'Virendra Singh Solanki',
    assignedOfficerBadge: 'DOSJE-VO-6104',
    assignedDate: '2026-11-20',
    deadlineDate: '2026-11-23',
    priority: 'Critical / High Risk',
    triggerReason: 'AI Anomaly Alert: Severe biometric attendance discrepancy & CCTV disconnect',
    status: 'Pending Acceptance',
    conflictCheckPassed: true,
    estimatedDistanceKm: 14.2
  },
  {
    id: 'ASN-2026-903',
    institutionId: 'INST-RJ-006',
    institutionName: 'Aanchal Destitute Senior Haven',
    scheme: 'AVYAY',
    assignedOfficerName: 'Sunita Meena, IDAS',
    assignedOfficerBadge: 'DOSJE-VO-3891',
    assignedDate: '2026-11-19',
    deadlineDate: '2026-11-22',
    priority: 'High Priority',
    triggerReason: 'AI Anomaly Alert: Camera angle shift (Tampering) & missing October report',
    status: 'Accepted',
    conflictCheckPassed: true,
    estimatedDistanceKm: 28.5
  }
];

const INITIAL_ANOMALIES = [
  {
    id: 'ANOM-8821',
    title: 'Severe Attendance Inflation & Ghost Beneficiaries Suspected',
    category: 'Attendance Anomaly',
    institutionId: 'INST-DL-002',
    institutionName: 'SMILE Rainbow Shelter & Hub, Delhi',
    scheme: 'SMILE',
    riskLevel: 'High Risk',
    confidenceScore: '94.8%',
    detectedAt: '2026-11-21 09:15 AM',
    description: 'Grant claim filed for 85 residential beneficiaries. However, integrated CCTV facial recognition model counted only 42 unique individuals over 5 consecutive days. 34 Aadhaar biometric punches were logged within a 90-second window from a single IP.',
    indicators: [
      'Burst-mode biometric punches (34 punches in 90 secs)',
      'CCTV head count vs portal register gap: -50.6%',
      'Night-time occupancy sensor below 40% threshold'
    ],
    status: 'Active - Action Mandated',
    suggestedAction: 'Immediate surprise physical verification & freeze 2nd installment grant.'
  },
  {
    id: 'ANOM-8820',
    title: 'CCTV Stream Tampering / Lens Angular Deflection',
    category: 'CCTV Tampering',
    institutionId: 'INST-RJ-006',
    institutionName: 'Aanchal Destitute Senior Haven, Jaipur',
    scheme: 'AVYAY',
    riskLevel: 'High Risk',
    confidenceScore: '91.2%',
    detectedAt: '2026-11-20 03:40 PM',
    description: 'Living quarters camera CAM-RJ06-01 experienced a 65-degree deliberate upward shift at 15:40 hrs. Edge video analytics flagged static ceiling image pattern.',
    indicators: [
      'Lens tilt anomaly vector (Delta: 65 degrees)',
      'Zero optical movement over 14 hours during active hours'
    ],
    status: 'Assigned to Flying Squad',
    suggestedAction: 'Dispatch Officer Sunita Meena for on-site physical verification.'
  },
  {
    id: 'ANOM-8815',
    title: 'Duplicate Aadhaar Hash Across Multiple Districts',
    category: 'Beneficiary Fraud Indicator',
    institutionId: 'INST-MH-004',
    institutionName: 'Jeevan Jyoti IRCA, Pune',
    scheme: 'NMBA',
    riskLevel: 'Medium Risk',
    confidenceScore: '89.0%',
    detectedAt: '2026-11-19 11:20 AM',
    description: 'AI identity deduplication engine identified 4 beneficiary records whose masked Aadhaar hash matches beneficiaries concurrently enrolled in another centre.',
    indicators: ['Cross-district biometric collision', 'Duplicate monthly grant claim'],
    status: 'Flagged for Audit',
    suggestedAction: 'Issue digital show-cause notice & demand physical biometric re-enrollment.'
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'NOTIF-01',
    type: 'critical',
    title: 'Critical Anomaly: High Attendance Fraud Indicator',
    message: 'AI flagged SMILE Rainbow Shelter, Delhi with 50.6% discrepancy between CCTV count and biometric attendance register.',
    time: '12 mins ago',
    unread: true,
    actionView: 'anomalies',
    scheme: 'SMILE'
  },
  {
    id: 'NOTIF-02',
    type: 'camera',
    title: 'CCTV Tampering Alert - Living Quarters',
    message: 'Camera CAM-RJ06-01 at Aanchal Senior Haven, Jaipur tilted 65 degrees toward ceiling. Visual verification recommended.',
    time: '45 mins ago',
    unread: true,
    actionView: 'cctv',
    scheme: 'AVYAY'
  },
  {
    id: 'NOTIF-03',
    type: 'assignment',
    title: 'New Surprise Inspection Task Assigned',
    message: 'Joint Secretary approved AI auto-assignment of Special Flying Squad for SMILE Shelter Delhi.',
    time: '2 hrs ago',
    unread: true,
    actionView: 'assignments',
    scheme: 'SMILE'
  }
];

const COMPLETED_INSPECTIONS = [
  {
    id: 'INS-2026-881',
    institutionId: 'INST-UP-001',
    institutionName: 'Samarthya Deendayal Special Education',
    scheme: 'DDRS',
    officerName: 'Rajesh Sharma, ISS',
    inspectionDate: '2026-10-18',
    inspectionTime: '11:45 AM',
    gpsLocation: '26.4499° N, 80.3319° E',
    overallScore: 94.2,
    verdict: 'Recommended for 2nd Grant Tranche',
    evidenceCount: 4,
    remarks: 'Well-maintained campus. Speech therapy equipment fully functional. Divyang ramps properly installed.'
  },
  {
    id: 'INS-2026-879',
    institutionId: 'INST-UP-003',
    institutionName: 'Kashi Ananda Vridhashram',
    scheme: 'AVYAY',
    officerName: 'Amitabh Sengupta, IES',
    inspectionDate: '2026-11-02',
    inspectionTime: '02:30 PM',
    gpsLocation: '25.3176° N, 82.9739° E',
    overallScore: 96.8,
    verdict: 'Exemplary Model Institution',
    evidenceCount: 6,
    remarks: 'Elders expressed deep satisfaction with geriatric medical checkups and hygienic dietary arrangements.'
  }
];

// -------------------------------------------------------------
// MAIN APP COMPONENT WITH STATE
// -------------------------------------------------------------
function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [currentRoleKey, setCurrentRoleKey] = useState('DEPARTMENT_OFFICIAL');
  const [isDeviceSimulator, setIsDeviceSimulator] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  // Entities
  const [institutions, setInstitutions] = useState(INITIAL_INSTITUTIONS);
  const [cctvCameras, setCctvCameras] = useState(INITIAL_CCTV);
  const [assignments, setAssignments] = useState(INITIAL_ASSIGNMENTS);
  const [anomalies, setAnomalies] = useState(INITIAL_ANOMALIES);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [inspections, setInspections] = useState(COMPLETED_INSPECTIONS);
  const [toast, setToast] = useState(null);

  // Active call & inspection selection
  const [targetCallInst, setTargetCallInst] = useState(INITIAL_INSTITUTIONS[1]);
  const [callState, setCallState] = useState('idle'); // idle | spinning | connected

  const currentUser = USER_ROLES[currentRoleKey];
  const unreadCount = notifications.filter(n => n.unread).length;

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const switchRole = (key) => {
    setCurrentRoleKey(key);
    showToast(`Switched view to ${USER_ROLES[key].name}`, 'success');
  };

  const triggerMockAnomalyAlert = () => {
    const newAnom = {
      id: `ANOM-${Math.floor(9000 + Math.random() * 999)}`,
      title: 'Real-time Facial Recognition Count Mismatch Alert',
      category: 'Attendance Anomaly',
      institutionId: 'INST-UP-001',
      institutionName: 'Samarthya Deendayal Special Education, Kanpur',
      scheme: 'DDRS',
      riskLevel: 'High Risk',
      confidenceScore: '96.2%',
      detectedAt: new Date().toLocaleTimeString(),
      description: 'AI Live Stream analytics detected 12 students in vocational hall while classroom attendance register logged 45 present.',
      indicators: ['Optical biometric head-count gap: -73.3%', 'No motion detected in Section B room for 90 minutes'],
      status: 'Immediate Action Required',
      suggestedAction: 'Launch Surprise Video Conference or dispatch District Flying Squad.'
    };
    setAnomalies([newAnom, ...anomalies]);
    setNotifications([
      {
        id: `NOTIF-${Date.now()}`,
        type: 'critical',
        title: 'CRITICAL ALERT: Real-time Attendance Mismatch',
        message: 'AI CV model flagged 73% attendance deficit at Samarthya Special Education, Kanpur.',
        time: 'Just now',
        unread: true,
        actionView: 'anomalies',
        scheme: 'DDRS'
      },
      ...notifications
    ]);
    showToast('🚨 Critical AI Anomaly detected and pushed to Central Vigilance!', 'warning');
  };

  const runAiAutoAssignment = () => {
    const unassigned = institutions.find(i => !assignments.some(a => a.institutionId === i.id));
    const target = unassigned || institutions[Math.floor(Math.random() * institutions.length)];
    const newAsn = {
      id: `ASN-2026-${Math.floor(100 + Math.random() * 900)}`,
      institutionId: target.id,
      institutionName: target.name,
      scheme: target.scheme,
      assignedOfficerName: 'Dr. Kavitha Ramanathan',
      assignedOfficerBadge: 'DOSJE-VO-5519',
      assignedDate: new Date().toISOString().split('T')[0],
      deadlineDate: '2026-11-25',
      priority: target.riskLevel === 'High' ? 'Critical / High Risk' : 'AI Routine Sampling',
      triggerReason: 'Automated AI Vigilance Protocol: Fair workload balance & 0 conflict',
      status: 'Pending Acceptance',
      conflictCheckPassed: true,
      estimatedDistanceKm: Math.floor(15 + Math.random() * 40)
    };
    setAssignments([newAsn, ...assignments]);
    setNotifications([
      {
        id: `NOTIF-${Date.now()}`,
        type: 'assignment',
        title: 'New AI Inspection Assigned',
        message: `Dr. Kavitha Ramanathan assigned to inspect ${target.name}.`,
        time: 'Just now',
        unread: true,
        actionView: 'assignments',
        scheme: target.scheme
      },
      ...notifications
    ]);
    showToast(`AI Assignment Generated for ${target.name}!`, 'success');
    if (window.confetti) window.confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* 1. TOP HEADER */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-md">
        <div className="tricolor-strip w-full"></div>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo & Portal Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveScreen('dashboard')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg border border-amber-400/30 flex-shrink-0">
              <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24">
                <path d="M12 2L15 8H9L12 2Z" />
                <circle cx="12" cy="14" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M12 9V19M7 14H17M8.5 10.5L15.5 17.5M8.5 17.5L15.5 10.5" stroke="currentColor" strokeWidth="1.5" />
                <rect x="7" y="20" width="10" height="2" rx="1" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Government of India</span>
                <span className="hidden md:inline-block text-[10px] bg-blue-900/80 text-blue-200 px-1.5 py-0.5 rounded border border-blue-700">DoSJE Central Vigilance</span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>DoSJE AI-Smart Monitor</span>
                <span className="text-xs font-normal text-slate-400 hidden sm:inline">| Real-Time Surveillance & Surprise Inspection</span>
              </h1>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Simulate Alert Button */}
            <button
              onClick={triggerMockAnomalyAlert}
              className="hidden lg:flex items-center space-x-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-rose-400/40 shadow-sm transition active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse"></span>
              <span>Simulate AI Alert</span>
            </button>

            {/* Mobile / Desktop Simulator Toggle */}
            <button
              onClick={() => setIsDeviceSimulator(!isDeviceSimulator)}
              className={`flex items-center space-x-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition border ${
                isDeviceSimulator 
                  ? 'bg-blue-600 text-white border-blue-400 shadow-sm' 
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <span>{isDeviceSimulator ? "🖥️ Desktop View" : "📱 Mobile Frame"}</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotificationDrawerOpen(true)}
              className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
            >
              <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Role Switcher */}
            <select
              value={currentRoleKey}
              onChange={(e) => switchRole(e.target.value)}
              className="bg-slate-800 text-xs text-white border border-slate-700 rounded-lg p-1.5 focus:outline-none max-w-[130px] sm:max-w-none"
            >
              {Object.entries(USER_ROLES).map(([k, r]) => (
                <option key={k} value={k}>{r.name.split(' ')[0]} ({k.slice(0, 7)})</option>
              ))}
            </select>

          </div>
        </div>
      </header>

      {/* 2. BODY CONTAINER */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Sidebar */}
        {!isDeviceSimulator && activeScreen !== 'splash' && (
          <aside className="w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)] p-3">
            <div className="space-y-1">
              <div className="px-3 py-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Operational Modules
              </div>
              {[
                { id: 'dashboard', label: 'Main Dashboard', icon: '📊' },
                { id: 'cctv', label: 'Live CCTV Monitoring', icon: '📹', badge: 'Live' },
                { id: 'surprise_call', label: 'Surprise Video Call', icon: '📞', badge: 'WebRTC' },
                { id: 'assignments', label: 'Random Assignment', icon: '🎲', badge: 'AI Smart' },
                { id: 'inspection_form', label: 'Mobile Inspection', icon: '📋', badge: 'GPS' },
                { id: 'geo_evidence', label: 'Geo-Tagged Evidence', icon: '🗺️' },
                { id: 'anomalies', label: 'AI Anomaly Detection', icon: '⚠️', badge: `${anomalies.filter(a => a.riskLevel === 'High Risk').length} Alert` },
                { id: 'notifications', label: 'Notifications & Alerts', icon: '🔔', badge: unreadCount ? `${unreadCount}` : null },
                { id: 'reports', label: 'Reports & Analytics', icon: '📈', badge: 'PDF' },
                { id: 'profile', label: 'Profile & Settings', icon: '👤' },
                { id: 'auth', label: 'Login / Switch Portal', icon: '🔑' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                    activeScreen === item.id
                      ? 'bg-blue-600 text-white font-bold shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="flex items-center space-x-2.5">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-sky-300 border border-slate-700">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] space-y-1">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-live-pulse"></span>Server Grid Status</span>
                <span>99.98%</span>
              </div>
              <p className="text-[10px] text-slate-500">DoSJE National Central Node • UIDAI & CCTNS Linked</p>
            </div>
          </aside>
        )}

        {/* Viewport Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 min-h-[calc(100vh-4rem)] pb-16 md:pb-6">
          {isDeviceSimulator ? (
            /* MOBILE PHONE SIMULATOR FRAME */
            <div className="min-h-full bg-slate-950 p-4 sm:p-8 flex flex-col items-center justify-center">
              <div className="mb-3 flex items-center justify-between w-full max-w-[380px] bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-300">
                <span className="font-bold text-white">📱 Field Officer Mobile Frame</span>
                <button onClick={() => setIsDeviceSimulator(false)} className="px-2 py-1 bg-blue-600 text-white rounded text-[11px]">
                  Desktop View
                </button>
              </div>

              <div className="relative w-full max-w-[380px] h-[780px] bg-slate-900 rounded-[45px] p-3 shadow-2xl border-4 border-slate-700 flex flex-col overflow-hidden">
                <div className="h-6 w-full flex items-center justify-between px-6 text-slate-400 text-[11px] font-bold select-none bg-slate-900">
                  <span>09:41</span>
                  <span>5G 🔋</span>
                </div>
                <div className="flex-1 w-full bg-slate-100 rounded-[32px] overflow-y-auto relative pb-16">
                  {renderScreen(activeScreen, {
                    institutions, setInstitutions, cctvCameras, setCctvCameras, assignments, setAssignments,
                    anomalies, setAnomalies, notifications, setNotifications, inspections, setInspections,
                    currentUser, currentRoleKey, switchRole, setActiveScreen, showToast,
                    targetCallInst, setTargetCallInst, callState, setCallState, runAiAutoAssignment
                  })}
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-500 rounded-full"></div>
              </div>
            </div>
          ) : (
            /* WIDE DESKTOP VIEW */
            renderScreen(activeScreen, {
              institutions, setInstitutions, cctvCameras, setCctvCameras, assignments, setAssignments,
              anomalies, setAnomalies, notifications, setNotifications, inspections, setInspections,
              currentUser, currentRoleKey, switchRole, setActiveScreen, showToast,
              targetCallInst, setTargetCallInst, callState, setCallState, runAiAutoAssignment
            })
          )}
        </main>
      </div>

      {/* 3. MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 z-30 px-2 py-1 flex justify-around items-center h-14 text-slate-400 text-[10px]">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: '📊' },
          { id: 'cctv', label: 'CCTV', icon: '📹' },
          { id: 'inspection_form', label: 'Inspect', icon: '📋' },
          { id: 'anomalies', label: 'AI Alerts', icon: '⚠️' },
          { id: 'reports', label: 'Reports', icon: '📈' }
        ].map(b => (
          <button
            key={b.id}
            onClick={() => setActiveScreen(b.id)}
            className={`flex flex-col items-center flex-1 py-1 ${activeScreen === b.id ? 'text-blue-400 font-bold' : 'hover:text-slate-200'}`}
          >
            <span className="text-base">{b.icon}</span>
            <span>{b.label}</span>
          </button>
        ))}
      </nav>

      {/* 4. NOTIFICATION DRAWER */}
      {isNotificationDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-4 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400 font-bold">🔔 Central Alert Feed</span>
                  <span className="text-xs text-slate-400">({notifications.length})</span>
                </div>
                <button onClick={() => setIsNotificationDrawerOpen(false)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <div className="mt-4 space-y-3 max-h-[75vh] overflow-y-auto">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => {
                      if (n.actionView) setActiveScreen(n.actionView);
                      setIsNotificationDrawerOpen(false);
                    }}
                    className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 hover:border-blue-400 cursor-pointer space-y-1"
                  >
                    <div className="flex justify-between text-[10px] text-amber-400 font-bold">
                      <span>{n.scheme}</span>
                      <span className="text-slate-400">{n.time}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white">{n.title}</h4>
                    <p className="text-[11px] text-slate-300">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setNotifications(notifications.map(n => ({ ...n, unread: false })));
                showToast('All notifications marked as read', 'info');
              }}
              className="w-full py-2 bg-blue-600 rounded-xl text-xs font-bold text-white"
            >
              Mark All Read
            </button>
          </div>
        </div>
      )}

      {/* 5. FLOATING TOAST BANNER */}
      {toast && (
        <div className="fixed bottom-16 md:bottom-6 right-4 sm:right-6 z-50 max-w-sm bg-slate-900 border border-slate-700 text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between space-x-3">
          <span className="text-xs font-medium text-slate-200">{toast.message}</span>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white text-xs">✕</button>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// SCREEN DISPATCHER
// -------------------------------------------------------------
function renderScreen(screen, props) {
  switch (screen) {
    case 'splash':
      return <SplashScreenView {...props} />;
    case 'auth':
      return <AuthScreenView {...props} />;
    case 'dashboard':
      return <DashboardScreenView {...props} />;
    case 'cctv':
      return <CCTVScreenView {...props} />;
    case 'surprise_call':
      return <SurpriseCallScreenView {...props} />;
    case 'assignments':
      return <AssignmentsScreenView {...props} />;
    case 'inspection_form':
      return <InspectionFormScreenView {...props} />;
    case 'geo_evidence':
      return <GeoEvidenceScreenView {...props} />;
    case 'anomalies':
      return <AnomaliesScreenView {...props} />;
    case 'notifications':
      return <NotificationsScreenView {...props} />;
    case 'reports':
      return <ReportsScreenView {...props} />;
    case 'profile':
      return <ProfileScreenView {...props} />;
    default:
      return <DashboardScreenView {...props} />;
  }
}

// -------------------------------------------------------------
// 1. SPLASH SCREEN VIEW
// -------------------------------------------------------------
function SplashScreenView({ setActiveScreen, switchRole, currentRoleKey }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-amber-500 p-0.5 shadow-2xl flex items-center justify-center">
        <span className="text-3xl">🏛️</span>
      </div>
      <div>
        <div className="text-xs text-amber-400 font-bold uppercase tracking-widest">Ministry of Social Justice & Empowerment</div>
        <h1 className="text-2xl sm:text-4xl font-black mt-1">AI-Based Smart Real-Time Monitoring & Surprise Inspection Suite</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
          Centralized vigilance platform for PM-AJAY, SMILE, AVYAY, DDRS, and NMBA schemes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl w-full text-left">
        {Object.entries(USER_ROLES).map(([k, r]) => (
          <div
            key={k}
            onClick={() => { switchRole(k); setActiveScreen('dashboard'); }}
            className={`p-3 rounded-xl border cursor-pointer transition ${currentRoleKey === k ? 'bg-blue-900/60 border-blue-400' : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800'}`}
          >
            <div className="text-xs font-bold text-white">{r.name}</div>
            <div className="text-[10px] text-slate-400 truncate">{r.designation}</div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setActiveScreen('dashboard')}
        className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-bold text-sm shadow-xl"
      >
        Launch Central Monitoring Dashboard ➔
      </button>
    </div>
  );
}

// -------------------------------------------------------------
// 2. AUTH / ROLE SWITCHER VIEW (Requirement 1)
// -------------------------------------------------------------
function AuthScreenView({ currentRoleKey, switchRole, setActiveScreen, showToast }) {
  const [selectedRole, setSelectedRole] = useState(currentRoleKey);
  const [otpStep, setOtpStep] = useState(false);
  const [otpVal, setOtpVal] = useState('749201');

  const role = USER_ROLES[selectedRole];

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-1">
        <span className="text-xs font-bold text-blue-700 uppercase bg-blue-100 px-3 py-1 rounded-full">Requirement 1 • Role-Based Authentication</span>
        <h2 className="text-2xl font-black text-slate-900">DoSJE Central Single Sign-On (SSO)</h2>
        <p className="text-xs text-slate-500">Select any of the 6 official user roles to test specialized workflows</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 uppercase">Select Role Portal:</label>
          {Object.entries(USER_ROLES).map(([k, r]) => (
            <div
              key={k}
              onClick={() => setSelectedRole(k)}
              className={`p-3 rounded-xl border cursor-pointer flex items-center space-x-3 transition ${selectedRole === k ? 'bg-blue-50 border-blue-500 shadow-sm ring-1 ring-blue-500' : 'bg-white border-slate-200'}`}
            >
              <img src={r.avatar} className="w-10 h-10 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 truncate">{r.name}</div>
                <div className="text-[10px] text-slate-500 truncate">{r.designation}</div>
              </div>
              {selectedRole === k && <span className="text-blue-600 font-bold">✓</span>}
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-gov space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Sign in to {role.name}</h3>
            <span className="text-xs text-slate-500">{role.badge}</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Official Email / SSO ID</label>
              <input type="text" readOnly value={role.email} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs" />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">NIC Security Password</label>
              <input type="password" value="••••••••••••" readOnly className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg" />
            </div>

            {otpStep ? (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
                <div className="text-xs font-bold text-blue-900">Enter 6-Digit 2FA Security OTP</div>
                <input type="text" value={otpVal} onChange={e => setOtpVal(e.target.value)} className="w-full text-center text-lg font-bold font-mono p-2 border rounded-lg bg-white" />
                <p className="text-[10px] text-blue-700">Pre-filled mock OTP for evaluation.</p>
              </div>
            ) : null}

            <button
              onClick={() => {
                if (!otpStep) {
                  setOtpStep(true);
                  showToast('2FA Security OTP sent to registered Aadhaar Mobile', 'info');
                } else {
                  switchRole(selectedRole);
                  setActiveScreen('dashboard');
                }
              }}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-md"
            >
              {otpStep ? 'Verify OTP & Launch Dashboard ➔' : 'Request 2FA OTP ➔'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. MAIN DASHBOARD VIEW (Requirement 2)
// -------------------------------------------------------------
function DashboardScreenView({ institutions, anomalies, setActiveScreen, runAiAutoAssignment }) {
  const [schemeFilter, setSchemeFilter] = useState('ALL');

  const filteredInsts = institutions.filter(i => schemeFilter === 'ALL' || i.scheme === schemeFilter);
  const criticalCount = anomalies.filter(a => a.riskLevel === 'High Risk').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-amber-300 font-bold uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-live-pulse"></span>
            <span>Central Real-Time Vigilance Command</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black mt-1">Executive Vigilance & Smart Monitoring Dashboard</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">Centralized monitoring of 892 institutions across India with real-time biometric and CCTV feeds.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setActiveScreen('cctv')} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold">
            📹 Live CCTV Grid
          </button>
          <button onClick={() => setActiveScreen('surprise_call')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold">
            📞 Surprise Call
          </button>
          <button onClick={runAiAutoAssignment} className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold">
            🎲 AI Assign
          </button>
        </div>
      </div>

      {/* Scheme Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        <span className="font-bold text-slate-500 uppercase">Filter:</span>
        {['ALL', 'PM-AJAY', 'SMILE', 'AVYAY', 'DDRS', 'NMBA'].map(s => (
          <button
            key={s}
            onClick={() => setSchemeFilter(s)}
            className={`px-3 py-1 rounded-lg font-bold transition flex-shrink-0 ${schemeFilter === s ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 8 REQUIREMENT METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Registered Projects', val: '1,428', sub: '+18 this quarter', icon: '🏛️', col: 'text-blue-600' },
          { label: 'Active Institutions', val: '892', sub: 'Hostels, IRCAs, Rehabs', icon: '🏢', col: 'text-emerald-600' },
          { label: 'Total Beneficiaries', val: '1,84,520', sub: '94.8% Aadhaar-seeded', icon: '👥', col: 'text-indigo-600' },
          { label: 'Inspections Completed', val: '412', sub: '100% Geo-fence verified', icon: '✅', col: 'text-purple-600' },
          { label: 'Pending Inspections', val: '68', sub: 'Deadline < 72 hrs', icon: '⏳', col: 'text-amber-600' },
          { label: 'Critical Alerts', val: `${criticalCount}`, sub: 'Immediate Squad Action', icon: '🚨', col: 'text-rose-600', click: () => setActiveScreen('anomalies') },
          { label: 'Attendance %', val: '87.4%', sub: 'AEBAS Sync Active', icon: '📋', col: 'text-teal-600' },
          { label: 'Compliance Score', val: '89.2', sub: 'Grade A Central Standard', icon: '🎖️', col: 'text-amber-600' }
        ].map((m, idx) => (
          <div
            key={idx}
            onClick={m.click}
            className={`bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-gov hover:shadow-gov-lg transition ${m.click ? 'cursor-pointer hover:border-rose-400' : ''}`}
          >
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
              <span>{m.label}</span>
              <span className="text-xl">{m.icon}</span>
            </div>
            <div className={`text-2xl sm:text-3xl font-black mt-2 ${m.col}`}>{m.val}</div>
            <div className="text-[11px] text-slate-500 mt-1 font-medium">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Interactive Trajectory Graph (SVG/Canvas Representation) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-gov space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Attendance Audit Trajectory (Past 30 Days)</h3>
              <p className="text-xs text-slate-500">Reported Register vs. Biometric vs. CCTV AI Count</p>
            </div>
            <div className="flex space-x-3 text-xs font-semibold">
              <span className="text-blue-600">● Reported</span>
              <span className="text-emerald-600">● Biometric</span>
              <span className="text-amber-500">● CCTV AI</span>
            </div>
          </div>

          <div className="h-56 w-full flex items-end justify-between px-4 pt-6 pb-2 bg-slate-50 rounded-xl border border-slate-200">
            {[
              { d: '01 Nov', rep: 92, bio: 88, cctv: 87 },
              { d: '05 Nov', rep: 94, bio: 89, cctv: 88 },
              { d: '09 Nov', rep: 91, bio: 87, cctv: 86 },
              { d: '13 Nov', rep: 95, bio: 90, cctv: 89 },
              { d: '17 Nov', rep: 93, bio: 88, cctv: 86 },
              { d: '21 Nov', rep: 92, bio: 87, cctv: 85 }
            ].map((pt, i) => (
              <div key={i} className="flex flex-col items-center space-y-2 flex-1">
                <div className="flex items-end space-x-1 h-36">
                  <div style={{ height: `${pt.rep}%` }} className="w-2.5 sm:w-3.5 bg-blue-500 rounded-t" title={`Reported: ${pt.rep}%`}></div>
                  <div style={{ height: `${pt.bio}%` }} className="w-2.5 sm:w-3.5 bg-emerald-500 rounded-t" title={`Biometric: ${pt.bio}%`}></div>
                  <div style={{ height: `${pt.cctv}%` }} className="w-2.5 sm:w-3.5 bg-amber-500 rounded-t" title={`CCTV: ${pt.cctv}%`}></div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{pt.d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Institution Risk Breakdown */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-gov space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Institution Risk Tiers</h3>
            <p className="text-xs text-slate-500">AI Risk stratification across 892 institutions</p>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { tier: 'Low Risk (Compliant)', pct: 68, count: 606, col: 'bg-emerald-500' },
              { tier: 'Medium Risk (Under Watch)', pct: 22, count: 196, col: 'bg-amber-500' },
              { tier: 'High Risk (Action Flagged)', pct: 10, count: 90, col: 'bg-rose-500' }
            ].map((r, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span>{r.tier}</span>
                  <span>{r.pct}% ({r.count})</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div style={{ width: `${r.pct}%` }} className={`h-full ${r.col}`}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-blue-50 rounded-xl text-[11px] text-blue-900 border border-blue-200">
            💡 <strong>Central Directive:</strong> High-risk institutions are automatically queued for Surprise WebRTC Video Audits.
          </div>
        </div>
      </div>

      {/* Monitored Institutions Snapshot */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-gov space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">Active Institutions Monitoring Stream</h3>
          <button onClick={() => setActiveScreen('geo_evidence')} className="text-xs font-bold text-blue-600">View On Map ➔</button>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredInsts.map(inst => (
            <div key={inst.id} className="py-2.5 flex items-center justify-between text-xs hover:bg-slate-50 px-2 rounded-lg">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono text-[10px]">{inst.scheme}</span>
                  <span className="font-bold text-slate-900">{inst.name}</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">{inst.district}, {inst.state} • Attendance: {inst.todayAttendance}/{inst.enrolledBeneficiaries}</div>
              </div>

              <div className="text-right">
                <div className="font-bold text-slate-900">{inst.complianceScore}%</div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${inst.riskLevel === 'High' ? 'bg-rose-100 text-rose-700' : inst.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                  {inst.riskLevel} Risk
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// -------------------------------------------------------------
// 4. CCTV MONITORING VIEW (Requirement 3)
// -------------------------------------------------------------
function CCTVScreenView({ cctvCameras, setCctvCameras, showToast }) {
  const [gridMode, setGridMode] = useState('grid'); // grid | focus
  const [focusCamId, setFocusCamId] = useState(cctvCameras[0]?.id);
  const [timeStr, setTimeStr] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const t = setInterval(() => setTimeStr(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(t);
  }, []);

  const toggleCam = (id) => {
    setCctvCameras(cctvCameras.map(c => {
      if (c.id === id) {
        const next = c.status === 'Online' ? 'Offline' : 'Online';
        showToast(`Camera ${c.name} status: ${next}`, 'info');
        return { ...c, status: next, fps: next === 'Online' ? 30 : 0 };
      }
      return c;
    }));
  };

  const activeFocus = cctvCameras.find(c => c.id === focusCamId) || cctvCameras[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="bg-slate-900 p-5 rounded-2xl text-white border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="text-xs text-amber-400 font-bold uppercase">Requirement 3 • Live CCTV Surveillance</div>
          <h2 className="text-xl font-black mt-0.5">Live CCTV Multi-Camera Panels</h2>
          <p className="text-xs text-slate-300 mt-1">Simulated RTSP edge camera feeds with automated person detection boxes and scanlines.</p>
        </div>

        <div className="flex space-x-2 text-xs">
          <button
            onClick={() => setGridMode(gridMode === 'grid' ? 'focus' : 'grid')}
            className="px-3 py-1.5 bg-blue-600 rounded-xl text-white font-bold"
          >
            {gridMode === 'grid' ? 'Focus View' : 'Multi-Grid View'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {cctvCameras.map(cam => (
          <div key={cam.id} className="bg-white rounded-2xl border border-slate-200 shadow-gov overflow-hidden">
            <div className="p-3 bg-slate-900 text-white flex justify-between items-center text-xs">
              <span className="font-bold flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${cam.status === 'Online' ? 'bg-emerald-400 animate-live-pulse' : 'bg-rose-500'}`}></span>
                {cam.name}
              </span>
              <span className="font-mono text-[10px] text-sky-300">{cam.scheme}</span>
            </div>

            {/* Simulated Canvas Feed */}
            <div className="aspect-video w-full bg-black relative flex items-center justify-center overflow-hidden">
              {cam.status === 'Offline' ? (
                <div className="text-center text-rose-500 font-mono text-xs">
                  <div className="text-lg">⚠️ NO SIGNAL</div>
                  <div>RTSP Connection Timeout</div>
                </div>
              ) : cam.status === 'Tampered' ? (
                <div className="text-center text-amber-400 font-mono text-xs">
                  <div className="text-lg">⚠️ ANGLE SHIFTED</div>
                  <div>Lens Tilted Toward Ceiling</div>
                </div>
              ) : (
                <div className="w-full h-full relative bg-slate-800 p-4">
                  {/* Visual simulated room with person boxes */}
                  <div className="w-full h-full border border-slate-700 relative flex items-center justify-around">
                    {[1, 2, 3].map(p => (
                      <div key={p} className="border-2 border-emerald-400 px-2 py-3 rounded relative text-center">
                        <span className="text-2xl">👤</span>
                        <div className="text-[8px] font-mono bg-emerald-500 text-black px-1 font-bold mt-1">Person 98%</div>
                      </div>
                    ))}
                  </div>

                  <div className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] font-mono text-white">
                    {cam.id} • {cam.fps} FPS • {timeStr}
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[9px] font-mono text-sky-300">
                    GPS: {cam.coords}
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs">
              <div>
                <div className="font-bold text-slate-800 truncate">{cam.institutionName}</div>
                <div className="text-[10px] text-slate-500">{cam.zone}</div>
              </div>

              <div className="flex space-x-1.5">
                <button
                  onClick={() => showToast(`Snapshot captured from ${cam.name} with Geo-Tag [${cam.coords}]`, 'success')}
                  className="px-2.5 py-1 bg-blue-600 text-white rounded text-[10px] font-bold"
                >
                  📸 Snapshot
                </button>
                <button
                  onClick={() => toggleCam(cam.id)}
                  className={`px-2 py-1 rounded text-[10px] font-bold ${cam.status === 'Online' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}
                >
                  {cam.status === 'Online' ? 'Disconnect' : 'Restore'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. SURPRISE VIDEO CONFERENCE (Requirement 4)
// -------------------------------------------------------------
function SurpriseCallScreenView({ institutions, showToast }) {
  const [targetInst, setTargetInst] = useState(institutions[1]);
  const [callStatus, setCallStatus] = useState('idle'); // idle | ringing | connected
  const [callDuration, setCallDuration] = useState(0);
  const [micMuted, setMicMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);

  useEffect(() => {
    let t;
    if (callStatus === 'connected') {
      t = setInterval(() => setCallDuration(c => c + 1), 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(t);
  }, [callStatus]);

  const spinRandom = () => {
    setCallStatus('spinning');
    setTimeout(() => {
      const chosen = institutions[Math.floor(Math.random() * institutions.length)];
      setTargetInst(chosen);
      setCallStatus('idle');
      showToast(`Selected: ${chosen.name} for surprise audit!`, 'info');
    }, 1000);
  };

  const startCall = () => {
    setCallStatus('ringing');
    setTimeout(() => {
      setCallStatus('connected');
      showToast(`Connected with ${targetInst.contactPerson} via WebRTC!`, 'success');
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-emerald-950 to-slate-900 p-5 rounded-2xl text-white border border-emerald-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="text-xs text-emerald-400 font-bold uppercase">Requirement 4 • WebRTC Surprise Video Call</div>
          <h2 className="text-xl font-black mt-0.5">Surprise Video Conference Suite</h2>
          <p className="text-xs text-slate-300 mt-1">Random project selector and instant unannounced video audit with project incharges.</p>
        </div>

        <button
          onClick={spinRandom}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-white text-xs font-bold shadow-lg"
        >
          🎲 Spin & Pick Random Target
        </button>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-gov flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <img src={targetInst.image} className="w-14 h-14 rounded-xl object-cover" />
          <div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono">{targetInst.scheme}</span>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">{targetInst.name}</h3>
            <p className="text-xs text-slate-500">Incharge: <strong>{targetInst.contactPerson}</strong> ({targetInst.phone})</p>
          </div>
        </div>

        {callStatus === 'idle' ? (
          <button onClick={startCall} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md">
            📞 Initiate Surprise Call
          </button>
        ) : callStatus === 'ringing' ? (
          <span className="text-xs font-bold text-amber-600 animate-pulse">Calling Incharge...</span>
        ) : (
          <button onClick={() => setCallStatus('idle')} className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs shadow-md">
            End Call & Log Record
          </button>
        )}
      </div>

      {callStatus === 'connected' && (
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden aspect-video relative flex flex-col justify-between p-4 text-white">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-live-pulse"></span>
              {targetInst.contactPerson} (Project Incharge)
            </span>
            <span className="font-mono text-emerald-400 font-bold">{Math.floor(callDuration / 60)}:{(callDuration % 60).toString().padStart(2, '0')}</span>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80" className="h-64 rounded-xl object-cover" />
          </div>

          <div className="flex justify-center space-x-3">
            <button onClick={() => setMicMuted(!micMuted)} className={`p-3 rounded-full ${micMuted ? 'bg-rose-600' : 'bg-slate-800'}`}>
              {micMuted ? '🔇' : '🎙️'}
            </button>
            <button onClick={() => setCamOff(!camOff)} className={`p-3 rounded-full ${camOff ? 'bg-rose-600' : 'bg-slate-800'}`}>
              {camOff ? '🚫' : '📹'}
            </button>
            <button onClick={() => showToast('Geo-watermarked snapshot captured!', 'success')} className="p-3 bg-blue-600 rounded-full font-bold">
              📸
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 6. RANDOM ASSIGNMENT VIEW (Requirement 5)
// -------------------------------------------------------------
function AssignmentsScreenView({ assignments, setAssignments, runAiAutoAssignment, showToast, setActiveScreen }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-purple-950 to-slate-900 p-5 rounded-2xl text-white border border-purple-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="text-xs text-purple-300 font-bold uppercase">Requirement 5 • AI-Based Random Assignment</div>
          <h2 className="text-xl font-black mt-0.5">Automated Inspection Duty Allocator</h2>
          <p className="text-xs text-slate-300 mt-1">Impartial AI assignment with 0 conflict of interest and proximity routing.</p>
        </div>

        <button onClick={runAiAutoAssignment} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-white font-bold text-xs shadow-lg">
          🎲 Run AI Randomizer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map(a => (
          <div key={a.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-gov space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">{a.id}</span>
              <span className="font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">{a.status}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono">{a.scheme}</span>
              <h3 className="text-sm font-bold text-slate-900 mt-1">{a.institutionName}</h3>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
              <div><strong>Assigned Officer:</strong> {a.assignedOfficerName} ({a.assignedOfficerBadge})</div>
              <div><strong>Inspection Deadline:</strong> <span className="text-rose-600 font-bold">{a.deadlineDate}</span></div>
              <div className="text-emerald-700 font-bold">✓ Conflict Check: Passed (0 Home-District Conflict)</div>
            </div>

            <div className="flex space-x-2 pt-1">
              {a.status === 'Pending Acceptance' ? (
                <>
                  <button
                    onClick={() => {
                      setAssignments(assignments.map(x => x.id === a.id ? { ...x, status: 'Accepted' } : x));
                      showToast(`Accepted assignment ${a.id}`, 'success');
                    }}
                    className="flex-1 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                  >
                    Accept Assignment
                  </button>
                  <button
                    onClick={() => {
                      setAssignments(assignments.map(x => x.id === a.id ? { ...x, status: 'Rejected' } : x));
                      showToast(`Rejected assignment ${a.id}`, 'warning');
                    }}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setActiveScreen('inspection_form')}
                  className="w-full py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                >
                  Conduct Field Inspection ➔
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 7. MOBILE INSPECTION FORM (Requirement 6)
// -------------------------------------------------------------
function InspectionFormScreenView({ institutions, inspections, setInspections, currentUser, showToast, setActiveScreen }) {
  const [selectedInstId, setSelectedInstId] = useState(institutions[0]?.id);
  const [verifiedStaff, setVerifiedStaff] = useState(12);
  const [verifiedBeneficiaries, setVerifiedBeneficiaries] = useState(48);
  const [infraScore, setInfraScore] = useState(4.5);
  const [remarks, setRemarks] = useState('Spot verification completed. Ramps accessible, dietary standards met.');

  const inst = institutions.find(i => i.id === selectedInstId) || institutions[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInsp = {
      id: `INS-2026-${Math.floor(900 + Math.random() * 99)}`,
      institutionId: inst.id,
      institutionName: inst.name,
      scheme: inst.scheme,
      officerName: currentUser.name,
      inspectionDate: new Date().toISOString().split('T')[0],
      inspectionTime: new Date().toLocaleTimeString(),
      gpsLocation: `${inst.lat}° N, ${inst.lng}° E`,
      overallScore: 92.5,
      verdict: 'Approved Compliant',
      evidenceCount: 3,
      remarks
    };
    setInspections([newInsp, ...inspections]);
    showToast(`Inspection report #${newInsp.id} submitted with Geo-Lock!`, 'success');
    if (window.confetti) window.confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setActiveScreen('reports');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-5 rounded-2xl shadow-xl">
        <div className="text-xs text-amber-400 font-bold uppercase">Requirement 6 • Mobile Field Inspection Form</div>
        <h2 className="text-xl font-black mt-0.5">On-Site Surprise Inspection Audit</h2>
        <p className="text-xs text-slate-300 mt-1">Geo-tagged evidence, staff/beneficiary headcounts, infrastructure scoring, and digital sign-off.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-gov space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Target Institution:</label>
          <select value={selectedInstId} onChange={e => setSelectedInstId(e.target.value)} className="w-full p-2 border rounded-xl bg-slate-50 font-bold">
            {institutions.map(i => <option key={i.id} value={i.id}>{i.name} ({i.scheme})</option>)}
          </select>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center font-mono">
          <div>
            <div className="font-bold text-slate-800">GPS Telemetry Lock: {inst.lat}° N, {inst.lng}° E</div>
            <div className="text-[10px] text-emerald-700 font-bold">✓ Inside 50m Institutional Geofence</div>
          </div>
          <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold">RTK FIX</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Staff Headcount Verified:</label>
            <input type="number" value={verifiedStaff} onChange={e => setVerifiedStaff(Number(e.target.value))} className="w-full p-2 border rounded-lg font-bold" />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Beneficiaries Verified:</label>
            <input type="number" value={verifiedBeneficiaries} onChange={e => setVerifiedBeneficiaries(Number(e.target.value))} className="w-full p-2 border rounded-lg font-bold" />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Infrastructure Quality (1.0 - 5.0): {infraScore}★</label>
          <input type="range" min="1" max="5" step="0.1" value={infraScore} onChange={e => setInfraScore(Number(e.target.value))} className="w-full" />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Officer Observations & Directives:</label>
          <textarea rows={3} value={remarks} onChange={e => setRemarks(e.target.value)} className="w-full p-2 border rounded-lg" />
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center text-slate-500 font-mono text-[11px]">
          Digital Signature Hash: 0x8a92...4b1 (Officer: {currentUser.name})
        </div>

        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm shadow-md">
          Submit Inspection Report (Geo-Locked) ➔
        </button>
      </form>
    </div>
  );
}

// -------------------------------------------------------------
// 8. GEO-TAGGED EVIDENCE & MAP (Requirement 8)
// -------------------------------------------------------------
function GeoEvidenceScreenView({ institutions, inspections }) {
  useEffect(() => {
    if (!window.L) return;
    const map = window.L.map('map-container').setView([22.5937, 78.9629], 5);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    institutions.forEach(inst => {
      const color = inst.riskLevel === 'High' ? 'red' : inst.riskLevel === 'Medium' ? 'orange' : 'green';
      const marker = window.L.circleMarker([inst.lat, inst.lng], {
        color: color,
        fillColor: color,
        fillOpacity: 0.8,
        radius: 8
      }).addTo(map);
      marker.bindPopup(`<b>${inst.name}</b><br>${inst.scheme} • Score: ${inst.complianceScore}%<br>GPS: ${inst.lat}, ${inst.lng}`);
    });

    return () => map.remove();
  }, [institutions]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="bg-slate-900 p-5 rounded-2xl text-white border border-slate-800">
        <div className="text-xs text-sky-400 font-bold uppercase">Requirement 8 • Geo-Tagged Surveillance Map</div>
        <h2 className="text-xl font-black mt-0.5">Geospatial Inspection & Waypoint Map</h2>
        <p className="text-xs text-slate-300 mt-1">All registered institutions and verified GPS inspection evidence across India.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-2 shadow-gov h-[450px]">
          <div id="map-container" className="w-full h-full rounded-xl"></div>
        </div>

        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-gov space-y-3 max-h-[450px] overflow-y-auto">
          <h3 className="text-sm font-bold text-slate-900">Recent GPS Locked Audits</h3>
          {inspections.map(ins => (
            <div key={ins.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between font-mono font-bold text-blue-700">
                <span>{ins.id}</span>
                <span className="text-slate-500">{ins.inspectionDate}</span>
              </div>
              <div className="font-bold text-slate-900">{ins.institutionName}</div>
              <div className="text-slate-500 font-mono text-[11px]">GPS: {ins.gpsLocation}</div>
              <div className="text-emerald-700 font-bold">Score: {ins.overallScore}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 9. AI ANOMALY DETECTION (Requirement 7)
// -------------------------------------------------------------
function AnomaliesScreenView({ anomalies, setActiveScreen, showToast }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-rose-950 to-slate-900 p-5 rounded-2xl text-white border border-rose-800 flex justify-between items-center">
        <div>
          <div className="text-xs text-rose-400 font-bold uppercase">Requirement 7 • AI Anomaly Detection & Fraud Intelligence</div>
          <h2 className="text-xl font-black mt-0.5">Real-Time AI Anomaly & Fraud Analytics</h2>
          <p className="text-xs text-slate-300 mt-1">Automated pattern recognition for ghost beneficiaries, camera tilts, and attendance bursts.</p>
        </div>
        <span className="text-xs font-mono px-3 py-1 bg-rose-500/20 text-rose-300 rounded-lg border border-rose-500/40 font-bold">
          {anomalies.filter(a => a.riskLevel === 'High Risk').length} Critical Flags
        </span>
      </div>

      <div className="space-y-4">
        {anomalies.map(anom => (
          <div key={anom.id} className="bg-white p-5 rounded-2xl border border-rose-200 shadow-gov space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold uppercase text-[10px]">{anom.riskLevel}</span>
              <span className="font-mono text-blue-700 font-bold">ML Confidence: {anom.confidenceScore}</span>
            </div>

            <h3 className="text-base font-bold text-slate-900">{anom.title}</h3>
            <p className="text-xs text-slate-600">{anom.description}</p>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-slate-700">Forensic Indicators:</span>
              {anom.indicators.map((ind, i) => (
                <div key={i} className="text-slate-600">• {ind}</div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500">Suggested Action: <strong>{anom.suggestedAction}</strong></span>
              <div className="flex space-x-2">
                <button onClick={() => setActiveScreen('surprise_call')} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold">Video Audit</button>
                <button onClick={() => setActiveScreen('assignments')} className="px-3 py-1.5 bg-purple-600 text-white rounded-lg font-bold">Assign Squad</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 10. NOTIFICATIONS VIEW (Requirement 9)
// -------------------------------------------------------------
function NotificationsScreenView({ notifications, setNotifications, setActiveScreen }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="bg-slate-900 p-5 rounded-2xl text-white border border-slate-800">
        <div className="text-xs text-amber-400 font-bold uppercase">Requirement 9 • Central Alert Gateway</div>
        <h2 className="text-xl font-black mt-0.5">Real-Time Alerts & Notification Feed</h2>
        <p className="text-xs text-slate-300 mt-1">Live alerts for attendance discrepancies, CCTV disconnections, and inspection mandates.</p>
      </div>

      <div className="space-y-3">
        {notifications.map(n => (
          <div key={n.id} onClick={() => n.actionView && setActiveScreen(n.actionView)} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-gov cursor-pointer hover:border-blue-300 transition space-y-1">
            <div className="flex justify-between text-xs text-slate-400">
              <span className="font-bold text-blue-700">{n.scheme}</span>
              <span>{n.time}</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">{n.title}</h4>
            <p className="text-xs text-slate-600">{n.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 11. REPORTS & ANALYTICS (Requirement 10)
// -------------------------------------------------------------
function ReportsScreenView({ institutions, inspections, showToast }) {
  const [showPdf, setShowPdf] = useState(false);

  const exportCsv = () => {
    showToast('Exported official CSV dataset!', 'success');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 p-5 rounded-2xl text-white border border-blue-800 flex justify-between items-center">
        <div>
          <div className="text-xs text-amber-400 font-bold uppercase">Requirement 10 • Reports & Analytics</div>
          <h2 className="text-xl font-black mt-0.5">Vigilance Performance & Audit Reports</h2>
          <p className="text-xs text-slate-300 mt-1">Certified inspection reports, district matrices, and PDF export preview.</p>
        </div>

        <div className="flex space-x-2">
          <button onClick={exportCsv} className="px-3 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold border border-slate-700">Export CSV</button>
          <button onClick={() => setShowPdf(true)} className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-lg">Print PDF Report</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-gov overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] border-b">
            <tr>
              <th className="p-3">Report ID</th>
              <th className="p-3">Institution Name</th>
              <th className="p-3">Officer</th>
              <th className="p-3">Date</th>
              <th className="p-3">Score</th>
              <th className="p-3">Verdict</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {inspections.map(ins => (
              <tr key={ins.id} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-bold text-blue-600">{ins.id}</td>
                <td className="p-3 font-bold text-slate-900">{ins.institutionName}</td>
                <td className="p-3">{ins.officerName}</td>
                <td className="p-3 font-mono">{ins.inspectionDate}</td>
                <td className="p-3 font-bold">{ins.overallScore}%</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">{ins.verdict}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPdf && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 space-y-4 text-slate-900 shadow-2xl">
            <div className="text-center border-b pb-4 space-y-1">
              <div className="text-xs uppercase tracking-widest font-bold text-amber-800">Government of India • DoSJE</div>
              <h3 className="text-lg font-black uppercase">Statutory Scheme Vigilance Report</h3>
              <div className="text-[11px] font-mono text-slate-500">Ref: DoSJE/STAT/2026/Q3 • Blockchain Verified Seal</div>
            </div>

            <div className="text-xs space-y-2">
              <div className="p-3 bg-slate-50 rounded-lg"><strong>Total Monitored Projects:</strong> 1,428 | <strong>Compliance:</strong> 89.2%</div>
              <p>Certified that unannounced inspections and CCTV telemetry audits were executed across participating institutions with full geo-fencing compliance.</p>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">Print Document</button>
              <button onClick={() => setShowPdf(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 12. PROFILE & SETTINGS (Requirement 12)
// -------------------------------------------------------------
function ProfileScreenView({ currentUser, currentRoleKey, switchRole, setActiveScreen }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="bg-slate-900 p-5 rounded-2xl text-white border border-slate-800 flex justify-between items-center">
        <div>
          <div className="text-xs text-amber-400 font-bold uppercase">Requirement 12 • Profile & System Telemetry</div>
          <h2 className="text-xl font-black mt-0.5">Stakeholder Credentials & Settings</h2>
          <p className="text-xs text-slate-300 mt-1">Clearance level, cryptographic session token, and technology stack health.</p>
        </div>

        <button onClick={() => setActiveScreen('auth')} className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold">
          Sign Out / Switch Portal
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-gov text-center space-y-3">
          <img src={currentUser.avatar} className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-slate-200" />
          <div>
            <h3 className="text-base font-bold text-slate-900">{currentUser.name}</h3>
            <p className="text-xs text-blue-700 font-semibold">{currentUser.designation}</p>
            <p className="text-[11px] font-mono text-slate-500 mt-0.5">{currentUser.email}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl text-xs text-left space-y-1">
            <div><strong>Clearance:</strong> LEVEL-IV Central Vigilance</div>
            <div><strong>Aadhaar e-KYC:</strong> <span className="text-emerald-700 font-bold">VERIFIED ✓</span></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-gov space-y-3 text-xs">
          <h4 className="font-bold text-slate-900 border-b pb-2">Technology Architecture Health</h4>
          <div className="space-y-2">
            <div className="flex justify-between"><span>Firebase Firestore</span><span className="text-emerald-700 font-bold font-mono">Connected (24ms)</span></div>
            <div className="flex justify-between"><span>Firebase Authentication</span><span className="text-emerald-700 font-bold font-mono">Active (Secured)</span></div>
            <div className="flex justify-between"><span>WebRTC P2P Engine</span><span className="text-emerald-700 font-bold font-mono">STUN/TURN Online</span></div>
            <div className="flex justify-between"><span>Leaflet OpenStreetMap</span><span className="text-emerald-700 font-bold font-mono">Synchronized</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Render root
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
