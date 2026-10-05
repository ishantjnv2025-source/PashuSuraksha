import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { caseService } from "../api/caseService";
import { vetService } from "../api/vetService";
import StatsCard from "../components/common/StatsCard";
import { 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  FileEdit, 
  Microscope, 
  Ambulance, 
  MapPin, 
  User, 
  X,
  Search,
  Check,
  Send,
  Calendar,
  Sparkles
} from "lucide-react";

export default function VetDashboard({ onNavigate }) {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState(null);
  const [filterRisk, setFilterRisk] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Prescription / Clinical notes modal states
  const [prescriptionText, setPrescriptionText] = useState("");
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [labTestType, setLabTestType] = useState("FMD Antigen ELISA & PCR");
  const [labDestination, setLabDestination] = useState("Western Regional Disease Diagnostic Laboratory (WRDDL), Pune");
  const [submittingAction, setSubmittingAction] = useState(false);
  const [successNotice, setSuccessNotice] = useState("");

  const loadCases = async () => {
    setLoading(true);
    try {
      const data = await caseService.getCases();
      setCases(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCases();
  }, []);

  const handleOpenReview = (c) => {
    setSelectedCase(c);
    setPrescriptionText(c.prescription || "");
    setClinicalNotes(c.notes || "");
    setSuccessNotice("");
  };

  const handleSaveDiagnosis = async (e) => {
    e.preventDefault();
    if (!selectedCase) return;
    setSubmittingAction(true);
    try {
      await vetService.submitPrescription(selectedCase.id, {
        prescriptionText,
        notes: clinicalNotes
      });
      setSuccessNotice("Clinical diagnosis & e-prescription saved successfully!");
      await loadCases();
      setTimeout(() => setSelectedCase(null), 1500);
    } finally {
      setSubmittingAction(false);
    }
  };

  const handleOrderLabTest = async () => {
    if (!selectedCase) return;
    setSubmittingAction(true);
    try {
      await vetService.requestLabTest(selectedCase.id, {
        testType: labTestType,
        laboratory: labDestination
      });
      setSuccessNotice("Diagnostic sample collection request dispatched to regional laboratory!");
      await loadCases();
    } finally {
      setSubmittingAction(false);
    }
  };

  const handleDispatchMobileUnit = async () => {
    if (!selectedCase) return;
    setSubmittingAction(true);
    try {
      await caseService.updateCaseStatus(selectedCase.id, "ASSIGNED", {
        assignedVet: {
          id: user?.id || "usr_vet_1",
          name: user?.name || "Dr. Ananya Joshi",
          phone: user?.phone || "+91 98220 11223",
          assignedAt: new Date().toISOString(),
          status: "Mobile Veterinary Unit Dispatched (1962)"
        }
      });
      setSuccessNotice("Mobile Veterinary Unit (1962) dispatched to farmer's location!");
      await loadCases();
    } finally {
      setSubmittingAction(false);
    }
  };

  const filteredCases = cases.filter(c => {
    const matchRisk = filterRisk === "ALL" || c.riskLevel === filterRisk;
    const matchSearch = c.suspectedDisease?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.farmerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.tagId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.location?.village?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRisk && matchSearch;
  });

  const highRiskCount = cases.filter(c => c.riskLevel === "HIGH").length;
  const underTreatmentCount = cases.filter(c => c.status === "UNDER_TREATMENT").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 px-3 py-1 rounded-full text-xs font-semibold text-teal-300">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Veterinary Officer Triage Desk • Maharashtra 1962 Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Dr. Ananya Joshi (MVU Unit #4)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Assigned Blocks: <strong>Haveli, Khed, Shirur</strong> • Polyclinic: <strong>Pune District Mobile Veterinary Centre</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-red-600/30 border border-red-500/40 px-4 py-2 rounded-2xl text-xs flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping"></span>
              <span><strong>{highRiskCount} High-Priority</strong> Outbreak Alerts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Priority Triage Queue"
          value={cases.length.toString()}
          subtitle="Cases requiring clinical review"
          icon={AlertTriangle}
          color="rose"
        />
        <StatsCard
          title="Active Field Treatments"
          value={underTreatmentCount.toString()}
          subtitle="Supportive therapy in progress"
          icon={Stethoscope}
          color="emerald"
        />
        <StatsCard
          title="Lab Samples Dispatched"
          value="4 Samples"
          subtitle="WRDDL Pune PCR testing"
          icon={Microscope}
          color="indigo"
        />
        <StatsCard
          title="Mobile Unit SLA"
          value="42 Mins"
          subtitle="Average dispatch to doorstep"
          icon={Ambulance}
          color="blue"
        />
      </div>

      {/* Triage Queue Table & Filters */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Live Triage & Case Review Queue
            </h2>
            <p className="text-xs text-slate-500">
              Deterministic severity classification from reported symptoms. Prioritize high-risk contagious viral strains.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search village, farmer, disease..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl font-medium">
              <button
                onClick={() => setFilterRisk("ALL")}
                className={`px-2.5 py-1 rounded-lg transition ${filterRisk === "ALL" ? "bg-white font-bold text-slate-900 shadow-2xs" : "text-slate-600"}`}
              >
                All
              </button>
              <button
                onClick={() => setFilterRisk("HIGH")}
                className={`px-2.5 py-1 rounded-lg transition ${filterRisk === "HIGH" ? "bg-red-600 text-white font-bold" : "text-slate-600"}`}
              >
                High Risk
              </button>
              <button
                onClick={() => setFilterRisk("MEDIUM")}
                className={`px-2.5 py-1 rounded-lg transition ${filterRisk === "MEDIUM" ? "bg-amber-500 text-white font-bold" : "text-slate-600"}`}
              >
                Medium
              </button>
              <button
                onClick={() => setFilterRisk("LOW")}
                className={`px-2.5 py-1 rounded-lg transition ${filterRisk === "LOW" ? "bg-emerald-600 text-white font-bold" : "text-slate-600"}`}
              >
                Low
              </button>
            </div>
          </div>
        </div>

        {/* Case Cards List */}
        <div className="space-y-4">
          {filteredCases.map((c) => (
            <div 
              key={c.id} 
              className={`rounded-2xl p-5 border transition ${
                c.riskLevel === "HIGH" 
                  ? "bg-red-50/40 border-red-200 hover:border-red-400" 
                  : c.riskLevel === "MEDIUM" 
                  ? "bg-amber-50/30 border-amber-200 hover:border-amber-400" 
                  : "bg-slate-50/60 border-slate-200 hover:border-emerald-300"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      c.riskLevel === "HIGH" ? "bg-red-600 text-white animate-pulse" : c.riskLevel === "MEDIUM" ? "bg-amber-500 text-white" : "bg-emerald-600 text-white"
                    }`}>
                      {c.riskLevel} PRIORITY ({c.triageScore}/100)
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-800">{c.id}</span>
                    <span className="text-slate-400 text-xs">•</span>
                    <span className="text-xs font-semibold text-slate-700">{c.animalType} ({c.animalBreed || "Local"})</span>
                    <span className="text-slate-400 text-xs">•</span>
                    <span className="text-xs font-mono text-slate-500">{c.tagId}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900">
                    {c.suspectedDisease}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      Farmer: <strong>{c.farmerName}</strong> ({c.farmerPhone})
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {c.location?.village}, {c.location?.block}, {c.location?.district}
                    </span>
                    <span className="text-slate-500">
                      Affected: <strong>{c.affectedCount}</strong> of {c.totalAnimalsInHerd} herd
                    </span>
                  </div>

                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-700">Symptoms: </span>
                    {c.symptoms.join(" • ")}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap lg:flex-col items-end justify-end gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenReview(c)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-xs"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                    Review & Prescribe
                  </button>

                  <a
                    href={`tel:${c.farmerPhone}`}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> Call Farmer
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CASE REVIEW & CLINICAL PRESCRIPTION MODAL */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-600">{selectedCase.id}</span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Clinical Examination & Intervention
                </h3>
                <p className="text-xs text-slate-500">
                  Patient: {selectedCase.animalType} • Tag: {selectedCase.tagId} • Farmer: {selectedCase.farmerName}
                </p>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full bg-slate-100 hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {successNotice && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs p-3.5 rounded-2xl flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-bold">{successNotice}</span>
              </div>
            )}

            {/* Quick 1962 Mobile Unit Dispatch */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-red-900">Mobile Veterinary Unit Dispatch (1962)</p>
                <p className="text-xs text-red-700">Send doorstep response vehicle with cold-chain vaccines & emergency drugs.</p>
              </div>
              <button
                onClick={handleDispatchMobileUnit}
                disabled={submittingAction}
                className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1.5"
              >
                <Ambulance className="w-4 h-4" /> Dispatch MVU
              </button>
            </div>

            {/* Form for Clinical Diagnosis & E-Prescription */}
            <form onSubmit={handleSaveDiagnosis} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Veterinary Clinical Observations & Diagnosis
                </label>
                <textarea
                  rows="3"
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  placeholder="Enter differential diagnosis, lesion characteristics, vital signs..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:bg-white focus:border-emerald-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  E-Prescription & Supportive Therapy
                </label>
                <textarea
                  rows="3"
                  value={prescriptionText}
                  onChange={(e) => setPrescriptionText(e.target.value)}
                  placeholder="e.g. Meloxicam 15ml IM, Ceftiofur sodium 1g, antiseptic mouth wash, supportive multivitamins..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:bg-white focus:border-emerald-500"
                ></textarea>
              </div>

              {/* Lab sample order section */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Microscope className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold text-slate-800">Diagnostic Laboratory Sample Order</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Assay / Protocol</label>
                    <select
                      value={labTestType}
                      onChange={(e) => setLabTestType(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl outline-none"
                    >
                      <option value="FMD Antigen ELISA & PCR">FMD Antigen ELISA & PCR</option>
                      <option value="Capripoxvirus PCR (LSD)">Capripoxvirus PCR (LSD)</option>
                      <option value="Brucella Rose Bengal Plate Test">Brucella Rose Bengal Plate Test</option>
                      <option value="Anthrax Stained Smear / Culture">Anthrax Stained Smear / Culture</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Designated Laboratory</label>
                    <input
                      type="text"
                      value={labDestination}
                      onChange={(e) => setLabDestination(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl outline-none text-slate-700"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleOrderLabTest}
                  disabled={submittingAction}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition"
                >
                  Confirm & Dispatch Lab Specimen Request
                </button>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedCase(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingAction}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-md shadow-emerald-600/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  Save & Notify Farmer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
