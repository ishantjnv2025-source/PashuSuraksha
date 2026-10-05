import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { surveillanceService } from "../api/surveillanceService";
import StatsCard from "../components/common/StatsCard";
import DiseaseHotspotMap from "../components/map/DiseaseHotspotMap";
import { 
  Building2, 
  MapPin, 
  ShieldAlert, 
  Radio, 
  Send, 
  CheckCircle2, 
  TrendingUp, 
  Activity, 
  Users, 
  FileSpreadsheet, 
  Layers, 
  BellRing,
  Sparkles
} from "lucide-react";

export default function OfficialDashboard({ onNavigate }) {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [analytics, setAnalytics] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [broadcastOpen, setBroadcastOpen] = useState(false);

  // Broadcast Form State
  const [alertTitle, setAlertTitle] = useState("Urgent Ring Vaccination: Haveli Block");
  const [alertTargetDistrict, setAlertTargetDistrict] = useState("Pune");
  const [alertTargetBlock, setAlertTargetBlock] = useState("Haveli");
  const [alertSeverity, setAlertSeverity] = useState("HIGH");
  const [alertMessage, setAlertMessage] = useState("Clusters of Foot-and-Mouth Disease (FMD) confirmed in Wagholi. 1962 Mobile Veterinary Units are conducting doorstep ring vaccination. Restrict inter-village livestock movement.");
  const [broadcasting, setBroadcasting] = useState(false);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const stats = await surveillanceService.getDistrictAnalytics();
      setAnalytics(stats);
      const activeAlerts = await surveillanceService.getAlerts();
      setAlerts(activeAlerts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleBroadcast = async (e) => {
    e.preventDefault();
    setBroadcasting(true);
    try {
      await surveillanceService.broadcastAlert({
        title: alertTitle,
        district: alertTargetDistrict,
        block: alertTargetBlock,
        severity: alertSeverity,
        message: alertMessage,
        sender: user?.name || "District Animal Husbandry Officer"
      });
      setBroadcastSuccess(true);
      await loadData();
      setTimeout(() => {
        setBroadcastOpen(false);
        setBroadcastSuccess(false);
      }, 2000);
    } finally {
      setBroadcasting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-semibold text-blue-300">
              <Building2 className="w-3.5 h-3.5" />
              <span>Department of Animal Husbandry & Dairying (DAHD), Govt of Maharashtra</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              State & District Disease Surveillance Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Jurisdiction: <strong>Pune District (14 Blocks)</strong> • Officer: <strong>Shri Rajesh Deshmukh, IAS</strong>
            </p>
          </div>

          <button
            onClick={() => setBroadcastOpen(true)}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl shadow-lg shadow-amber-500/25 text-xs flex items-center gap-2 transition"
          >
            <Radio className="w-4 h-4" />
            Broadcast Emergency Advisory
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Protected Livestock"
          value={analytics?.totalLivestockProtected || "24.8 Lakhs"}
          subtitle="Registered across Maharashtra"
          icon={Users}
          color="emerald"
        />
        <StatsCard
          title="Critical Outbreak Clusters"
          value={analytics?.criticalOutbreaksFlagged?.toString() || "3"}
          subtitle="Haveli, Khandala, Ahmednagar"
          icon={ShieldAlert}
          color="rose"
        />
        <StatsCard
          title="Active 1962 Mobile Units"
          value={analytics?.mobileUnitsActive?.toString() || "28 Units"}
          subtitle="Doorstep field responders"
          icon={Activity}
          color="blue"
        />
        <StatsCard
          title="District Vaccination Rate"
          value={analytics?.vaccinationCoverageRate || "89.4%"}
          subtitle="FMD + LSD + Brucellosis"
          icon={TrendingUp}
          color="indigo"
        />
      </div>

      {/* Active Broadcast Alert Banner */}
      {alerts.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-600 rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-start gap-3">
            <BellRing className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-red-900 text-sm">{alerts[0].title}</span>
                <span className="bg-red-200 text-red-900 font-bold px-2 py-0.5 rounded text-[10px]">
                  LIVE BROADCAST
                </span>
              </div>
              <p className="text-red-800 leading-relaxed">{alerts[0].message}</p>
              <p className="text-[10px] text-red-600">Dispatched by: {alerts[0].sender}</p>
            </div>
          </div>
        </div>
      )}

      {/* Interactive GIS Disease Hotspot Map (Slide 2 & 3) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Epidemiological Geospatial Intelligence
            </h2>
            <p className="text-xs text-slate-500">
              Interactive Leaflet / OpenStreetMap layer displaying disease clusters, quarantine radii, and active transmission vectors.
            </p>
          </div>
        </div>

        <DiseaseHotspotMap />
      </div>

      {/* Species & Risk Distribution Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Species Breakdown */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">
              Livestock Census & Disease Incidence by Species
            </h3>
            <span className="text-xs font-semibold text-slate-500">Pune District</span>
          </div>

          <div className="space-y-3">
            {analytics?.speciesBreakdown?.map((sp) => (
              <div key={sp.name} className="space-y-1 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-700">{sp.name}</span>
                  <span className="font-bold text-slate-900">{sp.count} cases ({sp.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${sp.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Severity Distribution */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">
              Triage Classification Ratio (Past 30 Days)
            </h3>
            <span className="text-xs font-semibold text-slate-500">State Norms</span>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
              <span className="text-2xl font-black text-red-700">18%</span>
              <p className="text-[11px] font-bold text-red-900 mt-1">High Risk</p>
              <p className="text-[10px] text-red-600">Immediate 1962 MVU</p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
              <span className="text-2xl font-black text-amber-700">34%</span>
              <p className="text-[11px] font-bold text-amber-900 mt-1">Medium Risk</p>
              <p className="text-[10px] text-amber-600">Vet Review & Visit</p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
              <span className="text-2xl font-black text-emerald-700">48%</span>
              <p className="text-[11px] font-bold text-emerald-900 mt-1">Low Risk</p>
              <p className="text-[10px] text-emerald-600">Guidance & Monitoring</p>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed pt-2">
            Rule-based triage prevents veterinary overloading by resolving 48% of mild cases via tele-monitoring while focusing mobile ambulance resources on high-risk contagious clusters.
          </p>
        </div>
      </div>

      {/* Emergency Advisory Broadcaster Modal */}
      {broadcastOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-extrabold text-slate-900">
                  Broadcast Emergency Outbreak Alert
                </h3>
              </div>
              <button
                onClick={() => setBroadcastOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {broadcastSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs p-3.5 rounded-2xl flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                SMS & App broadcast sent to all farmers and field veterinarians in {alertTargetBlock}!
              </div>
            )}

            <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Advisory Title</label>
                <input
                  type="text"
                  required
                  value={alertTitle}
                  onChange={(e) => setAlertTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target District</label>
                  <select
                    value={alertTargetDistrict}
                    onChange={(e) => setAlertTargetDistrict(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    <option value="Pune">Pune District</option>
                    <option value="Satara">Satara District</option>
                    <option value="Ahmednagar">Ahmednagar</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Block</label>
                  <input
                    type="text"
                    required
                    value={alertTargetBlock}
                    onChange={(e) => setAlertTargetBlock(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Advisory Message (Push & SMS)</label>
                <textarea
                  rows="3"
                  required
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setBroadcastOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={broadcasting}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl flex items-center gap-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  {broadcasting ? "Transmitting..." : "Send Outbreak Advisory"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
