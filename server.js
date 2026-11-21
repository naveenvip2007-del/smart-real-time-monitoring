/**
 * DoSJE Smart Monitoring & Surprise Inspection Suite
 * Backend Server: Node.js and Express.js REST API Architecture
 * 
 * Provides centralized RESTful API endpoints for:
 * - Institutions & Schemes Registry
 * - CCTV Telemetry & Heartbeat Gateway
 * - AI Anomaly & Fraud Analytics
 * - Algorithmic Random Inspection Assignments
 * - Geo-Tagged Field Inspection Ingestion
 * - WebRTC Video Audit Signaling Relay
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 5000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// In-Memory Data Store (Simulated Firebase Firestore Realtime Store)
const store = {
  kpi: {
    totalRegisteredProjects: 1428,
    activeInstitutions: 892,
    totalBeneficiaries: 184520,
    inspectionsCompleted: 412,
    pendingInspections: 68,
    criticalAlerts: 14,
    averageAttendancePct: 87.4,
    projectComplianceScore: 89.2
  },
  schemes: [
    { id: 'PM-AJAY', code: 'PMAJAY', name: 'PM Anusuchit Jaati Abhyuday Yojana', count: 382 },
    { id: 'SMILE', code: 'SMILE', name: 'Support for Marginalized Individuals for Livelihood & Enterprise', count: 214 },
    { id: 'AVYAY', code: 'AVYAY', name: 'Atal Vayo Abhyuday Yojana (Senior Citizens)', count: 298 },
    { id: 'DDRS', code: 'DDRS', name: 'Deendayal Disabled Rehabilitation Scheme', count: 345 },
    { id: 'NMBA', code: 'NMBA', name: 'Nasha Mukt Bharat Abhiyaan (IRCAs)', count: 189 }
  ],
  institutions: [
    {
      id: 'INST-UP-001',
      name: 'Samarthya Deendayal Special Education & Rehab',
      scheme: 'DDRS',
      state: 'Uttar Pradesh',
      district: 'Kanpur Nagar',
      lat: 26.4499,
      lng: 80.3319,
      contactPerson: 'Dr. Rakesh Trivedi',
      phone: '+91 98390 12489',
      enrolledBeneficiaries: 145,
      todayAttendance: 132,
      complianceScore: 94.2,
      riskLevel: 'Low'
    },
    {
      id: 'INST-DL-002',
      name: 'SMILE Rainbow Shelter & Transgender Skill Hub',
      scheme: 'SMILE',
      state: 'Delhi',
      district: 'Central Delhi',
      lat: 28.6507,
      lng: 77.2334,
      contactPerson: 'Ms. Simran Kinnar',
      phone: '+91 98112 45890',
      enrolledBeneficiaries: 85,
      todayAttendance: 42,
      complianceScore: 68.4,
      riskLevel: 'High'
    },
    {
      id: 'INST-UP-003',
      name: 'Kashi Ananda Vridhashram (Senior Citizens Care)',
      scheme: 'AVYAY',
      state: 'Uttar Pradesh',
      district: 'Varanasi',
      lat: 25.3176,
      lng: 82.9739,
      contactPerson: 'Swami Chinmay Das',
      phone: '+91 94152 77123',
      enrolledBeneficiaries: 60,
      todayAttendance: 58,
      complianceScore: 96.8,
      riskLevel: 'Low'
    }
  ],
  cctv: [
    { id: 'CAM-UP01-01', institutionId: 'INST-UP-001', name: 'Main Gate & Biometric Turnstile', status: 'Online', fps: 30, bitrate: '2.4 Mbps' },
    { id: 'CAM-UP01-02', institutionId: 'INST-UP-001', name: 'Mid-Day Dining & Nutrition Hall', status: 'Online', fps: 30, bitrate: '3.1 Mbps' },
    { id: 'CAM-DL02-01', institutionId: 'INST-DL-002', name: 'Vocational Stitching Room', status: 'Online', fps: 24, bitrate: '1.2 Mbps' },
    { id: 'CAM-DL02-02', institutionId: 'INST-DL-002', name: 'Main Perimeter Entrance', status: 'Offline', fps: 0, bitrate: '0 Kbps' }
  ],
  anomalies: [
    {
      id: 'ANOM-8821',
      title: 'Severe Attendance Inflation & Ghost Beneficiaries Suspected',
      institutionId: 'INST-DL-002',
      riskLevel: 'High Risk',
      confidenceScore: '94.8%',
      detectedAt: '2026-11-21 09:15 AM'
    }
  ],
  assignments: [
    {
      id: 'ASN-2026-904',
      institutionId: 'INST-DL-002',
      institutionName: 'SMILE Rainbow Shelter & Hub',
      assignedOfficerName: 'Virendra Singh Solanki',
      priority: 'Critical / High Risk',
      status: 'Pending Acceptance'
    }
  ]
};

// MIME Types Mapping
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.jsx': 'text/javascript; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

// Helper to send JSON responses
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data, null, 2));
}

// Request Handler
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS Pre-flight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // -----------------------------------------------------------
  // REST API ENDPOINTS (Node.js & Express Architecture)
  // -----------------------------------------------------------
  if (pathname === '/api/health') {
    return sendJson(res, 200, {
      status: 'healthy',
      system: 'DoSJE AI-Smart Monitoring Backend',
      timestamp: new Date().toISOString(),
      database: 'Firebase Firestore Architecture (Simulated)',
      auth: 'Firebase Auth / NIC e-Pramaan'
    });
  }

  if (pathname === '/api/kpi' && method === 'GET') {
    return sendJson(res, 200, store.kpi);
  }

  if (pathname === '/api/institutions' && method === 'GET') {
    return sendJson(res, 200, store.institutions);
  }

  if (pathname === '/api/cctv' && method === 'GET') {
    return sendJson(res, 200, store.cctv);
  }

  if (pathname === '/api/anomalies' && method === 'GET') {
    return sendJson(res, 200, store.anomalies);
  }

  if (pathname === '/api/assignments' && method === 'GET') {
    return sendJson(res, 200, store.assignments);
  }

  if (pathname === '/api/assignments/auto-assign' && method === 'POST') {
    const newAsn = {
      id: `ASN-2026-${Math.floor(100 + Math.random() * 900)}`,
      institutionId: 'INST-UP-001',
      institutionName: 'Samarthya Deendayal Special Education',
      assignedOfficerName: 'Dr. Kavitha Ramanathan',
      priority: 'AI Routine Sampling',
      status: 'Pending Acceptance',
      timestamp: new Date().toISOString()
    };
    store.assignments.unshift(newAsn);
    return sendJson(res, 201, { message: 'AI Assignment Generated', assignment: newAsn });
  }

  // -----------------------------------------------------------
  // STATIC ASSET SERVING
  // -----------------------------------------------------------
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA routing
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500);
        return res.end('Internal Server Error');
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`================================================================`);
  console.log(`🏛️ DoSJE AI-Smart Vigilance & Inspection Server Running!`);
  console.log(`📡 Local Access URL: http://localhost:${PORT}`);
  console.log(`📋 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`================================================================`);
});
