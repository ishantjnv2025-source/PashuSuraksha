import React from "react";
import { 
  ShieldAlert, 
  Activity, 
  Stethoscope, 
  Building2, 
  PhoneCall, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Microscope, 
  Smartphone, 
  Sparkles,
  HeartHandshake
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function Home({ onNavigate }) {
  const { switchRole } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-slate-900 to-slate-950 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:28px_28px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart India Hackathon 2026 • Problem Statement ID: 26128</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
            PashuSuraksha: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">Smart Livestock Health</span> & Early-Warning Platform
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Protecting livestock health, farmers' livelihood, and national food security through early symptom reporting, AI-assisted rule-based triage, automated 1962 mobile veterinary dispatch, and real-time outbreak surveillance.
          </p>

          {/* Quick CTA Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => { switchRole("farmer"); onNavigate("farmer"); }}
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <Activity className="w-5 h-5" />
              Report Sick Animal (Farmer Portal)
            </button>

            <button
              onClick={() => { switchRole("veterinarian"); onNavigate("vet"); }}
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold rounded-2xl flex items-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <Stethoscope className="w-5 h-5 text-emerald-400" />
              Veterinarian Triage Desk
            </button>

            <button
              onClick={() => { switchRole("official"); onNavigate("official"); }}
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold rounded-2xl flex items-center gap-2 transition transform hover:-translate-y-0.5"
            >
              <Building2 className="w-5 h-5 text-amber-400" />
              State & District Surveillance Map
            </button>
          </div>

          {/* 1962 Toll-free Quick Notice Banner */}
          <div className="mt-8 max-w-2xl mx-auto bg-red-950/60 border border-red-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-600/30 rounded-xl text-red-400">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  Emergency Mobile Veterinary Helpline
                </p>
                <p className="text-xs text-red-200">
                  Dial Toll-Free 1962 for immediate doorstep veterinary ambulance dispatch in Maharashtra.
                </p>
              </div>
            </div>
            <a
              href="tel:1962"
              className="shrink-0 bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold px-4 py-2 rounded-xl transition"
            >
              Call 1962
            </a>
          </div>
        </div>
      </section>

      {/* The Core Problem & Proposed Solution (Slides 1 & 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            Problem & Solution Overview
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Why Early Detection in Rural Livestock Matters
          </h3>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Livestock diseases often go unnoticed in early stages, leading to severe animal loss, farmer poverty, and rapid epidemic transmission across villages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-rose-50/60 border border-rose-100 rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-lg">The Critical Challenge</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Delayed symptom reporting leads to high livestock mortality, catastrophic household income loss, and uncontrollable spread of contagious viruses like FMD and Lumpy Skin Disease.
            </p>
            <ul className="text-xs text-rose-900 font-medium space-y-1.5 pt-2">
              <li className="flex items-center gap-1.5">• Loss of valuable milch & draft cattle</li>
              <li className="flex items-center gap-1.5">• Rural indebtedness and financial shock</li>
              <li className="flex items-center gap-1.5">• Food security & dairy supply disruption</li>
            </ul>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-100 rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-lg">Our PashuSuraksha Solution</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              A comprehensive digital bridge connecting farmers to veterinary doctors, rule-based triage, automated alerts, and village-level disease mapping.
            </p>
            <ul className="text-xs text-emerald-900 font-medium space-y-1.5 pt-2">
              <li className="flex items-center gap-1.5">• Instant Low / Medium / High Risk triage</li>
              <li className="flex items-center gap-1.5">• Rapid 1962 mobile veterinary unit dispatch</li>
              <li className="flex items-center gap-1.5">• Multi-tier tracking: Reported → Treated</li>
            </ul>
          </div>

          <div className="bg-blue-50/60 border border-blue-100 rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-slate-900 text-lg">Measurable Impact</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Empowering government veterinary officers with real-time epidemiological intelligence, ring vaccination planning, and rapid outbreak containment.
            </p>
            <ul className="text-xs text-blue-900 font-medium space-y-1.5 pt-2">
              <li className="flex items-center gap-1.5">• 85%+ faster veterinary response time</li>
              <li className="flex items-center gap-1.5">• Prevented herd epidemics via geo-fencing</li>
              <li className="flex items-center gap-1.5">• Seamless sync with Bharat Pashudhan (NDLM)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* System Flow Diagram (Slide 3) */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
              Technical Architecture & Workflow
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              End-to-End Disease Surveillance Lifecycle
            </h3>
            <p className="text-slate-600 text-sm max-w-2xl mx-auto">
              How PashuSuraksha processes symptoms from the farm gate all the way to state-level disease control.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Step 01</div>
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                Farmer Reporting
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Farmer enters symptoms, photos, and herd count in multilingual PWA with offline sync.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Step 02</div>
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-amber-600" />
                Rule-Based Triage
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Deterministic triage engine calculates severity (Low, Med, High) based on clinical protocols.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="text-xs font-bold text-red-600 uppercase tracking-wider">Step 03</div>
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                1962 Vet Dispatch
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                High-risk cases trigger priority SMS & mobile veterinary unit dispatch with GPS routing.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 04</div>
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Microscope className="w-4 h-4 text-blue-600" />
                Diagnostics & Rx
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Veterinarian logs digital prescription and submits lab sample orders (PCR/ELISA).
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="text-xs font-bold text-purple-600 uppercase tracking-wider">Step 05</div>
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-purple-600" />
                GIS Surveillance
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Real-time hotspot map and alerts enable block & district officers to contain clusters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Specific Portals Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            Stakeholder Experiences
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Tailored Dashboards for Every User Role
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Farmer */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                👨‍🌾
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Farmer & Livestock Owner</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Simplified interface in local languages (Marathi, Hindi, English) with voice assistance.
                </p>
              </div>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-center gap-2">✓ Digital symptom reporting & photos</li>
                <li className="flex items-center gap-2">✓ Instant triage risk calculation</li>
                <li className="flex items-center gap-2">✓ Live case status tracking & vet ETA</li>
                <li className="flex items-center gap-2">✓ Vaccination history lookup</li>
              </ul>
            </div>
            <button
              onClick={() => { switchRole("farmer"); onNavigate("farmer"); }}
              className="mt-6 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              Open Farmer Portal <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Veterinarian */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                🩺
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Veterinarian & MVU Officer</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Clinical decision support, priority triage queue, and mobile visit management.
                </p>
              </div>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-center gap-2">✓ High-risk outbreak emergency queue</li>
                <li className="flex items-center gap-2">✓ Digital e-prescription generator</li>
                <li className="flex items-center gap-2">✓ Diagnostic lab sample dispatch</li>
                <li className="flex items-center gap-2">✓ Farm visit routing & ETA status</li>
              </ul>
            </div>
            <button
              onClick={() => { switchRole("veterinarian"); onNavigate("vet"); }}
              className="mt-6 w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              Open Veterinary Portal <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Govt Official */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                🏛️
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Government Surveillance Officer</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Macro-level epidemiological intelligence for Village → Block → District containment.
                </p>
              </div>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-center gap-2">✓ GIS Disease Hotspot & cluster map</li>
                <li className="flex items-center gap-2">✓ Active outbreak alert broadcasting</li>
                <li className="flex items-center gap-2">✓ Mobile veterinary unit deployment stats</li>
                <li className="flex items-center gap-2">✓ Vaccination coverage analytics</li>
              </ul>
            </div>
            <button
              onClick={() => { switchRole("official"); onNavigate("official"); }}
              className="mt-6 w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              Open Surveillance Portal <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
