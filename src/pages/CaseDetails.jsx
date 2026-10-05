import React, { useState, useEffect } from "react";
import { caseService } from "../api/caseService";
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  Stethoscope, 
  PhoneCall, 
  CheckCircle2, 
  AlertTriangle, 
  Microscope, 
  Calendar, 
  Clock, 
  ShieldCheck 
} from "lucide-react";

export default function CaseDetails({ caseId, onBack }) {
  const [caseItem, setCaseItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCase() {
      setLoading(true);
      try {
        const data = await caseService.getCaseById(caseId);
        setCaseItem(data);
      } finally {
        setLoading(false);
      }
    }
    if (caseId) loadCase();
  }, [caseId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center text-slate-500">
        Loading case details...
      </div>
    );
  }

  if (!caseItem) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <p className="text-slate-600">Case record not found.</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      {/* Case Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                caseItem.riskLevel === "HIGH" ? "bg-red-100 text-red-700" : caseItem.riskLevel === "MEDIUM" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
              }`}>
                {caseItem.riskLevel} Risk Case
              </span>
              <span className="font-mono font-bold text-sm text-slate-900">{caseItem.id}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              {caseItem.suspectedDisease}
            </h1>
          </div>

          <div className="text-xs text-slate-500 sm:text-right">
            <div>Logged: {new Date(caseItem.reportedAt).toLocaleDateString()}</div>
            <div className="font-medium text-slate-700">Status: {caseItem.status}</div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-slate-500">Animal Category:</span>
            <p className="font-bold text-slate-800 text-sm mt-0.5">{caseItem.animalType}</p>
            <p className="text-[11px] text-slate-500">Tag: {caseItem.tagId}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-slate-500">Livestock Owner:</span>
            <p className="font-bold text-slate-800 text-sm mt-0.5">{caseItem.farmerName}</p>
            <p className="text-[11px] text-slate-500">{caseItem.farmerPhone}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-slate-500">Geo Location:</span>
            <p className="font-bold text-slate-800 text-sm mt-0.5">{caseItem.location?.village}</p>
            <p className="text-[11px] text-slate-500">{caseItem.location?.block}, {caseItem.location?.district}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-slate-500">Affected Proportion:</span>
            <p className="font-bold text-slate-800 text-sm mt-0.5">{caseItem.affectedCount} / {caseItem.totalAnimalsInHerd} herd</p>
            <p className="text-[11px] text-slate-500">Duration: {caseItem.durationDays} days</p>
          </div>
        </div>

        {/* Symptoms */}
        <div className="space-y-1 text-xs">
          <span className="font-bold text-slate-700">Reported Symptoms:</span>
          <div className="flex flex-wrap gap-2 pt-1">
            {caseItem.symptoms.map((s, idx) => (
              <span key={idx} className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg font-medium">
                • {s}
              </span>
            ))}
          </div>
        </div>

        {/* Notes */}
        {caseItem.notes && (
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700">
            <span className="font-bold text-slate-900 block mb-1">Field Observations:</span>
            {caseItem.notes}
          </div>
        )}

        {/* Assigned Doctor / Prescription */}
        {caseItem.prescription && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs space-y-1 text-emerald-950">
            <span className="font-bold block">Veterinary Prescription:</span>
            <p className="leading-relaxed">{caseItem.prescription}</p>
          </div>
        )}

        {/* Lab Test */}
        {caseItem.labTest && (
          <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl text-xs space-y-1 text-indigo-950">
            <span className="font-bold block">Laboratory Diagnosis:</span>
            <p>Test: <strong>{caseItem.labTest.testType}</strong></p>
            <p>Lab: {caseItem.labTest.laboratory}</p>
            <p>Result Status: <strong className="uppercase">{caseItem.labTest.status}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}
