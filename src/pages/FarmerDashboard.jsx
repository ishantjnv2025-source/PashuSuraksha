import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { caseService } from "../api/caseService";
import { surveillanceService } from "../api/surveillanceService";
import { evaluateLivestockRisk, COMMON_SYMPTOMS_LIST } from "../components/triage/TriageEngine";
import StatsCard from "../components/common/StatsCard";
import NotificationModal from "../components/common/NotificationModal";
import { 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert, 
  Mic, 
  UploadCloud, 
  FileText, 
  Stethoscope, 
  Syringe, 
  Calendar, 
  ChevronRight,
  Sparkles,
  MapPin,
  RefreshCw
} from "lucide-react";

export default function FarmerDashboard({ onNavigate, onSelectCase }) {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState("report"); // "report", "cases", "vaccinations"
  const [cases, setCases] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show1962Modal, setShow1962Modal] = useState(false);

  // Form State
  const [animalType, setAnimalType] = useState("Cattle (Cow)");
  const [tagId, setTagId] = useState("IN-MH-TAG-90812");
  const [selectedSymptoms, setSelectedSymptoms] = useState(["High fever (105°F)"]);
  const [feverLevel, setFeverLevel] = useState("High (104-106°F)");
  const [affectedCount, setAffectedCount] = useState(2);
  const [totalAnimalsInHerd, setTotalAnimalsInHerd] = useState(8);
  const [durationDays, setDurationDays] = useState(1);
  const [hasRecentMortality, setHasRecentMortality] = useState(false);
  const [notes, setNotes] = useState("");
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  // Live Rule-based Triage calculation
  const triageAssessment = evaluateLivestockRisk({
    animalType,
    symptoms: selectedSymptoms,
    affectedCount: Number(affectedCount),
    totalAnimalsInHerd: Number(totalAnimalsInHerd),
    durationDays: Number(durationDays),
    hasRecentMortality,
    feverLevel
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const allCases = await caseService.getCases();
      // If user has farmer role, prioritize their cases or show all mock cases for demo
      setCases(allCases);

      const vaxRecords = await surveillanceService.getVaccinationRecords();
      setVaccinations(vaxRecords);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleVoiceRecord = () => {
    setIsRecordingVoice(true);
    setTimeout(() => {
      setIsRecordingVoice(false);
      setSelectedSymptoms(prev => Array.from(new Set([...prev, "Blisters on mouth & tongue", "Excessive salivation"])));
      setNotes("Farmer reported in Marathi: जनावराच्या तोंडात फोड आले आहेत आणि लाळ गळत आहे. (Blisters in mouth & heavy drooling).");
    }, 2000);
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newCase = await caseService.reportCase({
        farmerId: user?.id || "usr_farmer_1",
        farmerName: user?.name || "Ramesh Patil",
        farmerPhone: user?.phone || "+91 98765 43210",
        animalType,
        tagId,
        symptoms: selectedSymptoms,
        durationDays: Number(durationDays),
        affectedCount: Number(affectedCount),
        totalAnimalsInHerd: Number(totalAnimalsInHerd),
        riskLevel: triageAssessment.riskLevel,
        triageScore: triageAssessment.score,
        suspectedDisease: triageAssessment.suspectedCondition,
        location: {
          village: user?.village || "Wagholi",
          block: user?.block || "Haveli",
          district: user?.district || "Pune",
          lat: 18.5793,
          lng: 73.9824
        },
        notes: notes || "Reported via Farmer Web App",
        assignedVet: triageAssessment.riskLevel === "HIGH" ? {
          id: "usr_vet_1",
          name: "Dr. Ananya Joshi",
          phone: "+91 98220 11223",
          status: "High-Priority Dispatch Triggered"
        } : null
      });

      setSubmitSuccess(newCase);
      await loadData();
      // Reset form after short delay
      setTimeout(() => {
        setActiveTab("cases");
        setSubmitSuccess(null);
      }, 2500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>National Digital Livestock Mission (NDLM) Connected</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t("welcome")}, {user?.name || "Ramesh Patil"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Village: <strong>{user?.village || "Wagholi"}</strong>, Block: <strong>{user?.block || "Haveli"}</strong>, District: <strong>{user?.district || "Pune"}</strong> • Herd Count: <strong>{user?.livestockCount || 8}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShow1962Modal(true)}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl shadow-lg shadow-red-600/30 text-xs flex items-center gap-2 transition"
            >
              <PhoneCall className="w-4 h-4" />
              {t("call1962")}
            </button>
            <button
              onClick={() => setActiveTab("report")}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-xs flex items-center gap-2 transition"
            >
              <PlusCircle className="w-4 h-4" />
              {t("reportSymptom")}
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Active Registered Herd"
          value={`${user?.livestockCount || 8} Animals`}
          subtitle="Tagged with Bharat Pashudhan"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatsCard
          title="Reported Health Cases"
          value={cases.length.toString()}
          subtitle="Total historical submissions"
          icon={FileText}
          color="blue"
        />
        <StatsCard
          title="Vaccination Status"
          value="1 Due Soon"
          subtitle="FMD booster recommended"
          icon={Syringe}
          color="amber"
        />
        <StatsCard
          title="Local Outbreak Risk"
          value="High (FMD)"
          subtitle="Wagholi cluster radius active"
          icon={AlertTriangle}
          color="rose"
        />
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab("report")}
          className={`pb-3 px-3 transition flex items-center gap-2 border-b-2 ${
            activeTab === "report"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          {t("reportSymptom")} (Digital Form)
        </button>
        <button
          onClick={() => setActiveTab("cases")}
          className={`pb-3 px-3 transition flex items-center gap-2 border-b-2 ${
            activeTab === "cases"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Clock className="w-4 h-4" />
          {t("myCases")} ({cases.length})
        </button>
        <button
          onClick={() => setActiveTab("vaccinations")}
          className={`pb-3 px-3 transition flex items-center gap-2 border-b-2 ${
            activeTab === "vaccinations"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <Syringe className="w-4 h-4" />
          {t("vaccinationHistory")}
        </button>
      </div>

      {/* TAB 1: REPORT SICK ANIMAL WITH LIVE TRIAGE ENGINE */}
      {activeTab === "report" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Digital Animal Health Reporting Form
                </h2>
                <p className="text-xs text-slate-500">
                  Fill in symptoms or record voice note in Marathi/Hindi for immediate veterinary guidance.
                </p>
              </div>

              {/* Voice-assisted input button (Slide 4 requirement) */}
              <button
                type="button"
                onClick={handleVoiceRecord}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                  isRecordingVoice 
                    ? "bg-red-600 text-white animate-pulse" 
                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                }`}
                title="Speak symptoms in Hindi or Marathi"
              >
                <Mic className="w-4 h-4" />
                {isRecordingVoice ? "Listening (बोलिए)..." : "Voice Input (बोला)"}
              </button>
            </div>

            {submitSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 text-emerald-900">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold">Case Successfully Logged: {submitSuccess.id}</p>
                  <p>Triage level: <strong>{submitSuccess.riskLevel}</strong>. Notification sent to local Mobile Veterinary Unit.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmitReport} className="space-y-5">
              {/* Animal Type & Ear Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Animal Category
                  </label>
                  <select
                    value={animalType}
                    onChange={(e) => setAnimalType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none"
                  >
                    <option value="Cattle (Cow)">Cattle / Cow (गाय)</option>
                    <option value="Buffalo">Buffalo (म्हैस)</option>
                    <option value="Goat">Goat (शेळी)</option>
                    <option value="Sheep">Sheep (मेंढी)</option>
                    <option value="Poultry">Poultry (कोंबडी)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pashu Tag ID (Ear Tag / NDLM)
                  </label>
                  <input
                    type="text"
                    value={tagId}
                    onChange={(e) => setTagId(e.target.value)}
                    placeholder="e.g. IN-MH-TAG-90812"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none"
                  />
                </div>
              </div>

              {/* Observed Symptoms Checklist */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Observed Symptoms (Click all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                  {COMMON_SYMPTOMS_LIST.map((symp) => {
                    const isSelected = selectedSymptoms.includes(symp);
                    return (
                      <button
                        type="button"
                        key={symp}
                        onClick={() => toggleSymptom(symp)}
                        className={`p-2 rounded-xl text-left transition flex items-center justify-between ${
                          isSelected
                            ? "bg-emerald-600 text-white font-semibold shadow-xs"
                            : "bg-white text-slate-700 border border-slate-200 hover:border-emerald-300"
                        }`}
                      >
                        <span className="truncate pr-1">{symp}</span>
                        {isSelected && <span className="text-xs">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Severity Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Fever Intensity
                  </label>
                  <select
                    value={feverLevel}
                    onChange={(e) => setFeverLevel(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                  >
                    <option value="Normal">Normal Temperature</option>
                    <option value="Moderate (102-104°F)">Moderate (102-104°F)</option>
                    <option value="High (104-106°F)">High (104-106°F)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Animals Showing Symptoms
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={affectedCount}
                    onChange={(e) => setAffectedCount(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Total Animals in Herd
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={totalAnimalsInHerd}
                    onChange={(e) => setTotalAnimalsInHerd(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                  />
                </div>
              </div>

              {/* Mortality flag */}
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-2xl">
                <input
                  type="checkbox"
                  id="mortalityCheck"
                  checked={hasRecentMortality}
                  onChange={(e) => setHasRecentMortality(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded border-red-300 focus:ring-red-500"
                />
                <label htmlFor="mortalityCheck" className="text-xs text-red-900 font-bold">
                  Any sudden unexplained death in herd within the last 48 hours?
                </label>
              </div>

              {/* Supporting Photo/Document Upload Mock */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Upload Photo or Supporting Document (Optional)
                </label>
                <div 
                  onClick={() => setPhotoUploaded(!photoUploaded)}
                  className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition ${
                    photoUploaded 
                      ? "border-emerald-500 bg-emerald-50 text-emerald-800" 
                      : "border-slate-300 hover:border-slate-400 bg-slate-50"
                  }`}
                >
                  <UploadCloud className="w-6 h-6 mx-auto mb-1 text-slate-400" />
                  <p className="text-xs font-medium">
                    {photoUploaded ? "✓ Photo attached: cow_oral_blisters.jpg" : "Click to upload lesion or animal picture"}
                  </p>
                  <p className="text-[10px] text-slate-500">Supports JPG, PNG up to 10MB</p>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Additional Observations / Field Notes
                </label>
                <textarea
                  rows="2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe animal behavior, feed intake, or timeline..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/30 text-xs sm:text-sm flex items-center justify-center gap-2 transition"
              >
                {submitting ? "Analyzing & Logging..." : "Submit Case for Immediate Veterinary Action"}
              </button>
            </form>
          </div>

          {/* Right Column: Live Explainable Triage Risk Assessment (Slide 2 & 3) */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <ShieldAlert className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Live Rule-Based Triage Preview
                </h3>
              </div>

              {/* Risk Badge */}
              <div className={`p-4 rounded-2xl border text-center space-y-1 ${
                triageAssessment.riskLevel === "HIGH" 
                  ? "bg-red-50 border-red-200 text-red-900" 
                  : triageAssessment.riskLevel === "MEDIUM" 
                  ? "bg-amber-50 border-amber-200 text-amber-900" 
                  : "bg-emerald-50 border-emerald-200 text-emerald-900"
              }`}>
                <span className="text-[10px] uppercase font-mono tracking-widest font-extrabold">
                  Calculated Risk Level
                </span>
                <div className="text-2xl font-black">{triageAssessment.riskLevel} RISK</div>
                <div className="text-xs font-semibold">{triageAssessment.priorityBadge}</div>
                <div className="text-xs pt-1 opacity-80">
                  Severity Score: <strong>{triageAssessment.score} / 100</strong>
                </div>
              </div>

              {/* Suspected condition */}
              <div className="space-y-1 text-xs">
                <span className="text-slate-500 font-medium">Suspected Condition:</span>
                <p className="font-bold text-slate-800 text-sm">{triageAssessment.suspectedCondition}</p>
              </div>

              {/* Recommended Action */}
              <div className="space-y-1 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  Protocol Recommendation:
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {triageAssessment.recommendedAction}
                </p>
              </div>

              {/* Emergency Call Box */}
              {triageAssessment.riskLevel === "HIGH" && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShow1962Modal(true)}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-red-600/20"
                  >
                    <PhoneCall className="w-4 h-4" />
                    Request 1962 Mobile Vet Unit
                  </button>
                </div>
              )}
            </div>

            {/* Offline PWA Note (Slide 4) */}
            <div className="bg-slate-900 text-slate-200 rounded-3xl p-5 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Sparkles className="w-4 h-4" />
                Offline-First PWA Sync Active
              </div>
              <p className="text-slate-400 leading-relaxed">
                No mobile network in your farm? You can still log symptoms. Reports are stored securely in IndexedDB and automatically dispatched as soon as internet connectivity returns.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY REPORTED CASES PIPELINE */}
      {activeTab === "cases" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                My Reported Health Cases & Live Progress
              </h2>
              <p className="text-xs text-slate-500">
                Track status across the complete care cycle: Reported → Reviewed → Assigned → Under Treatment → Resolved.
              </p>
            </div>
            <button
              onClick={loadData}
              className="p-2 text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 rounded-xl transition text-xs font-semibold flex items-center gap-1.5 w-fit"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh Pipeline
            </button>
          </div>

          <div className="space-y-4">
            {cases.map((c) => {
              const statusSteps = ["REPORTED", "REVIEWED", "ASSIGNED", "UNDER_TREATMENT", "RESOLVED"];
              const currentStepIndex = statusSteps.indexOf(c.status);

              return (
                <div 
                  key={c.id} 
                  className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-4 hover:border-emerald-300 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase ${
                        c.riskLevel === "HIGH" ? "bg-red-100 text-red-700" : c.riskLevel === "MEDIUM" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {c.riskLevel} Risk
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-700">{c.id}</span>
                      <span className="text-slate-400 text-xs">•</span>
                      <span className="text-xs font-semibold text-slate-800">{c.animalType}</span>
                    </div>

                    <div className="text-xs text-slate-500">
                      Reported: {new Date(c.reportedAt).toLocaleDateString()} at {new Date(c.reportedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500">Suspected Disease:</span>
                      <p className="font-bold text-slate-800">{c.suspectedDisease}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Assigned Doctor:</span>
                      <p className="font-semibold text-emerald-700">
                        {c.assignedVet ? `${c.assignedVet.name} (${c.assignedVet.phone})` : "Queued for Assignment"}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500">Symptoms:</span>
                      <p className="text-slate-700 truncate">{c.symptoms.join(", ")}</p>
                    </div>
                  </div>

                  {/* 5-Step Pipeline Progress Indicator (Slide 3) */}
                  <div className="pt-2 border-t border-slate-200/80">
                    <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mb-2">
                      <span className={currentStepIndex >= 0 ? "text-emerald-700 font-bold" : ""}>1. Reported</span>
                      <span className={currentStepIndex >= 1 ? "text-emerald-700 font-bold" : ""}>2. Reviewed</span>
                      <span className={currentStepIndex >= 2 ? "text-emerald-700 font-bold" : ""}>3. Assigned (1962)</span>
                      <span className={currentStepIndex >= 3 ? "text-emerald-700 font-bold" : ""}>4. Treated</span>
                      <span className={currentStepIndex >= 4 ? "text-emerald-700 font-bold" : ""}>5. Resolved</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(((currentStepIndex + 1) / 5) * 100, 20)}%` }}
                      ></div>
                    </div>
                  </div>

                  {c.prescription && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900">
                      <strong>Prescribed Treatment: </strong> {c.prescription}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: VACCINATION & HEALTH HISTORY (Slide 5) */}
      {activeTab === "vaccinations" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Vaccination & Treatment Records (Bharat Pashudhan / NDLM)
            </h2>
            <p className="text-xs text-slate-500">
              Verified immunization history linked with 12-digit animal UID ear tags.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Tag ID</th>
                  <th className="py-3 px-4">Animal</th>
                  <th className="py-3 px-4">Vaccine</th>
                  <th className="py-3 px-4">Batch No</th>
                  <th className="py-3 px-4">Administered</th>
                  <th className="py-3 px-4">Next Due</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vaccinations.map((vac) => (
                  <tr key={vac.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">{vac.tagId}</td>
                    <td className="py-3 px-4 text-slate-700">{vac.animalType}</td>
                    <td className="py-3 px-4 font-semibold text-emerald-800">{vac.vaccineName}</td>
                    <td className="py-3 px-4 text-slate-500 font-mono">{vac.batchNo}</td>
                    <td className="py-3 px-4 text-slate-600">{vac.administeredDate}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{vac.nextDueDate}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        vac.status === "DUE_SOON" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {vac.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 1962 Emergency Modal */}
      <NotificationModal
        isOpen={show1962Modal}
        onClose={() => setShow1962Modal(false)}
      />
    </div>
  );
}
