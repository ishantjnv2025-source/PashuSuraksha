# PashuSuraksha – Smart Livestock Health & Early-Warning Platform
> **Smart India Hackathon 2026 (SIH 2026)**  
> **Problem Statement ID:** 26128  
> **Problem Statement Title:** Efficient systems for early detection, prevention, and management of livestock diseases and animal health issue  
> **Theme:** MedTech / BioTech / HealthTech  
> **Category:** Software  
> **Team ID:** 188403 | **Team Name:** Webflux  

---

## 📌 Executive Summary of the Presentation & Requirements

Based on the 6 slides in your presentation:
1. **The Core Problem (Slide 2):**  
   Livestock diseases in rural areas go unnoticed during the initial stages. By the time veterinary help arrives, mortality is high and transmission has spread across villages.
2. **PashuSuraksha Solution (Slide 2 & 3):**  
   A digital platform connecting farmers to veterinary services via:
   - Digital symptom reporting with photos, voice input, and offline PWA capability
   - Rule-based / ML deterministic risk triage (Low / Medium / High Risk)
   - Real-time Mobile Veterinary Unit (1962 helpline) dispatch and case tracking
   - State and district disease hotspot & GIS outbreak mapping
3. **Target Stakeholders & Separate Dashboards (Slide 2 & 5):**
   - **Farmers & Livestock Owners:** Report symptoms, get instant triage guidance, track case progress, view vaccination history, and dial 1962.
   - **Veterinarians & MVU Officers:** Review prioritized cases, prescribe medications, dispatch lab sample tests, and update field visits.
   - **Government Health Officials (DAHD):** Macro-level surveillance, village → block → district drill-downs, cluster maps, and emergency alert broadcasts.
4. **National Ecosystem Integration (Slide 6):**
   - Bharat Pashudhan (National Digital Livestock Mission - NDLM) animal ID tags
   - DAHD Livestock Health & Disease Control Programme
   - Maharashtra 1962 Toll-free Call Centre & Mobile Veterinary Service Network

---

## 📂 Project Structure

```
frontend/
├── .env                  # Backend API URL & Mock switch
├── .env.example          # Template configuration
├── package.json          # Vite + React 19 + Tailwind CSS + Lucide
├── vite.config.js        # Vite 8 with @tailwindcss/vite plugin
├── src/
│   ├── api/
│   │   ├── apiClient.js          # Unified HTTP client with JWT handling & mock fallback
│   │   ├── authService.js        # login, register, getCurrentUser, logout
│   │   ├── caseService.js        # reportCase, getCases, getCaseById, updateCaseStatus
│   │   ├── vetService.js         # submitPrescription, requestLabTest, updateVisitStatus
│   │   ├── surveillanceService.js# getHotspots, getDistrictAnalytics, broadcastAlert
│   │   └── mockData.js           # Rich seed data (FMD, Lumpy Skin, Mastitis, Hotspots)
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx        # Responsive navigation, demo role switcher, 1962 call button, language toggle
│   │   │   ├── Footer.jsx        # SIH 2026 badges, team info, govt references
│   │   │   ├── StatsCard.jsx     # Modern metric cards with trends & icons
│   │   │   └── NotificationModal.jsx # 1962 Emergency Hotline modal
│   │   ├── triage/
│   │   │   └── TriageEngine.js   # Rule-based symptom assessment (Low/Med/High severity)
│   │   └── map/
│   │   │   └── DiseaseHotspotMap.jsx # Interactive epidemiological GIS cluster map
│   ├── context/
│   │   ├── AuthContext.jsx       # Global user session & 1-click role switcher
│   │   └── LanguageContext.jsx   # Multilingual engine (English, Hindi, Marathi)
│   ├── pages/
│   │   ├── Home.jsx              # Landing page with workflow & problem/solution
│   │   ├── Login.jsx             # Role-based login with quick demo access
│   │   ├── Register.jsx          # Role-based registration with NDLM & VCI fields
│   │   ├── FarmerDashboard.jsx   # Digital reporting form, live triage score, case timeline
│   │   ├── VetDashboard.jsx      # Triage queue, e-prescription modal, lab test dispatch
│   │   ├── OfficialDashboard.jsx # Outbreak GIS map, district metrics, alert broadcaster
│   │   └── CaseDetails.jsx       # Detailed single-case inspection
│   ├── App.css                   # Custom styles, glassmorphism, animations, print media
│   ├── index.css                 # Tailwind CSS v4 root stylesheet
│   ├── App.jsx                   # Master router & view switcher
│   └── main.jsx
```

---

## 🚀 How to Run the Frontend

1. Open PowerShell or Command Prompt in the frontend directory:
   ```powershell
   cd "C:\Users\ISHANT KUMAR\.gemini\antigravity\scratch\frontend"
   ```

2. Run the Vite development server:
   ```powershell
   npm run dev
   ```

3. Open your browser at the URL shown (typically `http://localhost:5173`).

---

## 🔌 Connecting to Your Backend (Node.js + Express + MongoDB)

The frontend is built with **zero tight coupling** and includes clean service wrappers.

### 1. Configure the API Base URL
In `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_USE_MOCK=false
```

### 2. Backend REST Endpoints to Implement in Node/Express

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Accepts `{ email, password, role }`, returns `{ token, user }` |
| `POST` | `/api/auth/register` | Accepts user details & role data, returns `{ token, user }` |
| `GET` | `/api/auth/me` | Validates JWT token from `Authorization: Bearer <token>` |
| `GET` | `/api/cases` | Fetches cases with optional query params `?riskLevel=HIGH` |
| `POST` | `/api/cases/report` | Creates new symptom report |
| `PUT` | `/api/cases/:id/status` | Updates case status (`REPORTED` → `REVIEWED` → `ASSIGNED` → `UNDER_TREATMENT` → `RESOLVED`) |
| `POST` | `/api/vet/prescriptions` | Stores doctor diagnosis and prescription text |
| `POST` | `/api/vet/lab-tests` | Orders lab sample analysis (PCR/ELISA) |
| `GET` | `/api/surveillance/hotspots` | Returns active disease clusters for the map |
| `GET` | `/api/surveillance/analytics` | Returns district metrics & species breakdown |
| `POST` | `/api/surveillance/broadcast` | Broadcasts emergency advisory to farmers |

> **Graceful Mock Fallback:**  
> If the backend server is temporarily down or not running yet, `apiClient.js` automatically falls back to local data and logs a warning in your browser console, ensuring the entire UI remains 100% interactive!

---

## 🌟 Key Features Matching SIH 2026 Presentation

- **Multilingual Support:** English, Hindi (हिन्दी), and Marathi (मराठी) support via the navbar language selector.
- **Explainable Rule-Based Triage:** Calculates real-time severity (0-100) and assigns Low, Medium, or High Risk with suspected conditions (FMD, Lumpy Skin, Mastitis) *before* submission.
- **1962 Mobile Veterinary Service Hotline:** Direct telephone integration and emergency modal.
- **GIS Epidemiological Map:** Visual cluster pins with pulse animations, risk filters, and quarantine buffer indicators.
- **1-Click Demo Persona Switcher:** Top navbar allows judges and evaluators to instantly switch between **Farmer (Ramesh)**, **Veterinarian (Dr. Ananya)**, and **Govt Official (Rajesh IAS)** without logging out.
