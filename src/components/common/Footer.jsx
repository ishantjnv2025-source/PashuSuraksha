import React from "react";
import { ShieldAlert, Heart, ExternalLink, Phone, FileCheck2, Award } from "lucide-react";

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Problem Statement */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">PashuSuraksha</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Smart Livestock Health & Early-Warning Platform. Empowering rural farmers, mobile veterinarians, and health authorities with intelligent triage, disease surveillance, and rapid response.
            </p>
            <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg text-xs">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300 font-medium">SIH 2026 • PS ID: 26128</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate("farmer")} className="hover:text-emerald-400 transition">
                  Farmer Portal & Symptom Reporting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("vet")} className="hover:text-emerald-400 transition">
                  Veterinary Triage & Case Review
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("official")} className="hover:text-emerald-400 transition">
                  State & District Surveillance Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("login")} className="hover:text-emerald-400 transition">
                  Secure Role-Based Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Government Integrations & References (From Slide 6) */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Integrated Ecosystem
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://ndlm.nic.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  Bharat Pashudhan (NDLM)
                </a>
              </li>
              <li>
                <a 
                  href="https://dahd.nic.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  DAHD Livestock Disease Control
                </a>
              </li>
              <li>
                <a 
                  href="https://ahd.maharashtra.gov.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition"
                >
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                  Maharashtra Veterinary Network
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-400 font-semibold pt-1">
                <Phone className="w-3.5 h-3.5" />
                1962 Toll-Free MVU Hotline
              </li>
            </ul>
          </div>

          {/* Col 4: Hackathon Team Info */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Team Webflux
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Developed for Smart India Hackathon 2026. Built with React, Tailwind CSS, Node.js API services, and Rule-based Risk Intelligence.
            </p>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/80 text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Team ID:</span>
                <span className="text-slate-200 font-mono font-bold">188403</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Category:</span>
                <span className="text-emerald-400 font-medium">Software (MedTech/BioTech)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target State:</span>
                <span className="text-slate-200">Maharashtra</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 PashuSuraksha. Built by Team Webflux for Smart India Hackathon.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Dedicated to protecting livestock health & rural farming communities
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
