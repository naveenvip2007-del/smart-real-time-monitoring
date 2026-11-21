# 🏛️ AI-Based Smart Real-Time Monitoring and Surprise Inspection Mobile Application for DoSJE Schemes

> **Ministry of Social Justice and Empowerment (DoSJE), Government of India**  
> *Central Vigilance, Project Monitoring & Surprise Inspection Automation Suite*  
> *Under Viksit Bharat 2047 & Digital India Governance Initiatives*

---

## 📌 Executive Summary

This enterprise application is a centralized monitoring and surprise inspection system engineered specifically for the **Department of Social Justice and Empowerment (DoSJE)**, Government of India. It provides end-to-end transparency, automated accountability, and real-time oversight for institutions, NGOs, residential schools, and rehabilitation centers operating under major flagship welfare schemes:

1. **PM-AJAY** (*Pradhan Mantri Anusuchit Jaati Abhyuday Yojana*)
2. **SMILE** (*Support for Marginalized Individuals for Livelihood and Enterprise*)
3. **AVYAY** (*Atal Vayo Abhyuday Yojana* - Senior Citizens Care)
4. **DDRS** (*Deendayal Disabled Rehabilitation Scheme*)
5. **NMBA** (*Nasha Mukt Bharat Abhiyaan* - Substance De-addiction & Rehab)
6. **SHRESTHA** (*Residential Education for Students in Targeted Areas*)

---

## 🚀 How to Run & Experience the Prototype

You have **two frictionless ways** to launch and evaluate the application:

### Option 1: Instant Browser Launch (Zero-Setup, Works in 2 Seconds!)
Simply open the HTML file in any browser (Google Chrome, Microsoft Edge, Mozilla Firefox):
- **Path:** `c:\Users\navee\OneDrive\Documents\dosje-smart-monitor\index.html`
- Or double-click `index.html` in Windows File Explorer.
- Everything runs immediately with full interactivity, smooth animations, interactive Leaflet maps, live CCTV canvas streams, digital signature pad, and instant role switching!

### Option 2: Full-Stack Node.js Server (REST APIs + Web Application)
To launch the Node.js backend server with RESTful API endpoints:
```powershell
cd c:\Users\navee\OneDrive\Documents\dosje-smart-monitor
node server.js
```
The server will start on port `5000`:
- **Web Application Portal:** [http://localhost:5000](http://localhost:5000)
- **REST API Health Endpoint:** [http://localhost:5000/api/health](http://localhost:5000/api/health)
- **KPI Metrics API:** [http://localhost:5000/api/kpi](http://localhost:5000/api/kpi)
- **Institutions Registry API:** [http://localhost:5000/api/institutions](http://localhost:5000/api/institutions)
- **CCTV Telemetry API:** [http://localhost:5000/api/cctv](http://localhost:5000/api/cctv)

*(Note: If running in an isolated sandbox, run with bypass permissions to access localhost in your host browser).*

---

## 🛠️ Verification of All 14 Project Requirements

### 1. User Roles and Login
- **6 Dedicated Stakeholder Portals:**
  1. **Department Officials (DoSJE):** Joint Secretary / Central Vigilance Wing
  2. **PMU Teams:** Project Monitoring Unit - Senior Lead Data Analyst & Auditor
  3. **Inspection Officers:** Special Flying Squad Grade-I
  4. **NGO / Institute Administrators:** Director / Shelter Warden
  5. **Project Incharge / Staff:** Ground Caretaker & Supervisor
  6. **Beneficiaries:** Resident / Trainee Citizen Representative
- **Role-Based Access Control (RBAC):** Tailored permissions matrix for each stakeholder.
- **SSO Authentication Features:** 2FA OTP verification simulation, UIDAI Aadhaar Biometric e-KYC integration, and an instant **Quick Role Switcher** dropdown in the top header bar for evaluation.

### 2. Main Executive Dashboard
- **8 Core Real-Time KPI Cards:**
  - Total Registered Projects (`1,428`)
  - Active Institutions (`892`)
  - Total Beneficiaries (`1,84,520`, 94.8% Aadhaar-seeded)
  - Inspections Completed (`412`)
  - Pending Inspections (`68`, deadline < 72h)
  - Critical AI Alerts (`14` flagged for immediate action)
  - Biometric Attendance Percentage (`87.4%`)
  - Project Compliance Score (`89.2 / 100`, Grade A)
- **Interactive Graphs & Visualizations:**
  - 30-Day Attendance Trajectory (Reported Register vs. Biometric vs. CCTV AI Count)
  - Scheme-wise Compliance Benchmark against DoSJE target threshold (90%)
  - Risk Distribution breakdown (Low: 68%, Medium: 22%, High: 10%)
  - Filter chips for all 5 central schemes.

### 3. Live CCTV Monitoring Grid
- Real-time CCTV streams from registered institutions across UP, Delhi, Maharashtra, and Rajasthan.
- Status indicators: `Online` (green pulse), `Offline` (signal timeout), `Tampered` (angle shift).
- Dynamic HTML5 canvas animation with simulated edge AI bounding boxes (`Person 98%`), optical scanlines, resolution indicators (1080p FHD 30fps), and NavIC GPS coordinates.
- **PTZ Controls Panel:** Pan/Tilt directional buttons, optical zoom (+1.5x / -1.0x), Infrared Night Vision toggle.
- **Layout Switcher:** Multi-Grid (2x2) and Focus Single View with instant Geo-Tagged snapshot capture.

### 4. Surprise Video Conference (WebRTC)
- **AI Random Selector Roulette:** Spins and selects an unannounced project/institution.
- **WebRTC Call Simulation Interface:**
  - Remote Incharge feed with live GPS watermark HUD
  - Local Inspector picture-in-picture (PiP) feed
  - Audio Mute, Video Camera toggle, Screen Share toggle, and End Call button
  - In-Call Inspection Audit Checklist (Warden physical presence, headcount spot-check, ration store audit, sanitation)
  - Floating in-call screenshot tool that captures and geo-watermarks frames
  - Call connection log & audit history with duration and verdict.

### 5. AI-Based Random Inspection Assignment
- Automated assignment algorithm optimizing:
  - **Zero Conflict of Interest:** Ensures no officer inspects an institution in their home district.
  - **Workload Balancing:** Evenly distributes surprise audits across squad officers.
  - **Risk-Prioritized Sampling:** High-risk institutions are assigned first.
- Interactive **"Run AI Smart Randomizer"** button.
- Details: Assigned officer name, badge number, deadline countdown (72 hrs), proximity distance (km), and conflict-check pass certificate.
- **Accept** and **Reject** buttons with formal justification modal.
- Official Statutory Mandate Letter generation with DoSJE seal.

### 6. Mobile Inspection Module (Field Inspector App)
- Clean, stepped field inspection audit form:
  - Auto-fetched Institution Name & Scheme ID
  - Pre-filled Inspection Officer credentials
  - Real-time GPS coordinate acquisition (`26.4499° N, 80.3319° E`) with `Inside 50m Geofence` verification
  - Staff Attendance verification (Physical vs Register)
  - Beneficiary Attendance verification (Physical vs Register)
  - Infrastructure Condition slider (1.0 to 5.0 stars) & Meal quality assessment
  - Statutory Document Checklist (AEBAS synced, ration vouchers, 30-day CCTV backup, fire safety NOC)
  - Photo & Video Evidence capture simulation with automatic date, time, and GPS watermarks
  - **Digital Signature Pad:** HTML5 canvas where the officer signs with finger/stylus/mouse
  - **"Submit Inspection Report"** button with automated compliance scoring and celebration confetti.

### 7. AI Anomaly Detection & Fraud Intelligence
- Machine learning forensic analytics detecting:
  - Burst-mode biometric attendance punching (34 punches in 90 seconds from 1 IP)
  - Ghost beneficiaries (CCTV count 50.6% below claimed attendance register)
  - CCTV angle tampering (camera tilted 65° toward ceiling)
  - Discrepancy between reported vs observed activities
  - Duplicate Aadhaar hash across multiple districts
- Risk level classification: **High Risk** (Red), **Medium Risk** (Amber), **Low Risk** (Emerald).
- Action triggers: "Launch Video Audit", "Assign Flying Squad", "Issue Digital Show-Cause Notice".

### 8. Geo-Tagged Evidence & Interactive Map
- Powered by **Leaflet & OpenStreetMap** with custom risk-coded circular pins.
- Clickable pins opening popup cards with institution photo, GPS coordinates, compliance score, and geofence status.
- Location-based inspection reports filterable by District.
- Geo-evidence viewer modal displaying high-resolution evidence with cryptographic verification hash.

### 9. Notification and Alert System
- Real-time Alert Center with categorized tabs (All, Critical Compliance, CCTV Disconnection, New Assignments, Reports).
- Sound alarm siren toggle (Mute / Active).
- **"Simulate Live Push Alert"** button in header to trigger real-time AI anomaly alarms during demonstrations.

### 10. Reports and Analytics
- Four interactive performance tabs:
  1. Institution-Wise Performance Scorecard (search, filter by scheme, sort)
  2. District-Wise Project Status Matrix
  3. Inspection History Log
  4. AI Anomaly Summaries
- **Export Capabilities:**
  - One-click **CSV / Excel** dataset download.
  - One-click **Official DoSJE PDF Print Preview** formatted with Government of India header, Ashoka emblem, official tables, QR verification seal, and Joint Secretary authorization.

### 11. UI/UX Design System
- **Enterprise Aesthetics:** Deep Navy Blue (`#0A1E3F`, `#0F172A`), National Saffron/Gold accents (`#D97706`, `#FF9933`), Forest Green (`#059669`).
- Ashoka Stambh emblem motif and Indian National Tricolor accent bar.
- **Responsive Layout:** Collapsible desktop sidebar + Mobile bottom navigation.
- **Interactive Smartphone Frame Simulator:** Click the **"📱 Mobile Frame"** toggle in the top header to preview how field officers see the inspection app inside an iPhone/Android mockup with native status bar, notch, and touch feel!

### 12. Required Screens
All 12 required screens are implemented and accessible via sidebar and bottom navigation:
1. Splash Screen
2. Login / Role SSO Portal
3. Main Executive Dashboard
4. CCTV Live Monitoring
5. Surprise Video Conference
6. Random Inspection Assignment
7. Mobile Field Inspection Form
8. Geo-Tagged Evidence & Map
9. AI Anomaly Detection
10. Notifications & Alert Center
11. Reports & Analytics
12. User Profile and Settings

### 13 & 14. Technology & Prototype Verification
- **Frontend:** React 18, Tailwind CSS, HTML5 Canvas, Leaflet Maps, WebRTC simulation, Lucide iconography.
- **Backend:** Node.js and Express REST API architecture with in-memory state synchronization.
- **Prototype Fidelity:** Fully clickable, navigable, with rich sample data across Uttar Pradesh, Delhi, Maharashtra, Rajasthan, and Bihar.

---

## 🏛️ Government Portal Credentials for Testing

| Role Name | Email / SSO ID | Password | Clearance Level |
|---|---|---|---|
| **Department Official (DoSJE)** | `js.vigilance@dosje.gov.in` | `GovtPass@2026#Vig` | LEVEL-IV Central |
| **PMU Team (Lead Analyst)** | `pmu.audit@dosje.gov.in` | `GovtPass@2026#Vig` | State Auditor |
| **Inspection Officer (Flying Squad)** | `officer.rajesh@vigilance.dosje.gov.in` | `GovtPass@2026#Vig` | Field Squad |
| **NGO Administrator** | `director@samarthya-ngo.org` | `GovtPass@2026#Vig` | Institutional |
| **Project Incharge / Staff** | `warden.kanpur@dosje-rehab.org` | `GovtPass@2026#Vig` | Ground Staff |
| **Beneficiary Representative** | `arjun.sharma@beneficiary.in` | `GovtPass@2026#Vig` | Citizen |

*Tip: You can switch between any role instantly using the dropdown in the top header bar!*
