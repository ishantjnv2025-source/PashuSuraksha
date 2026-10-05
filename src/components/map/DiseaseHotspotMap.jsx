import React, { useState, useEffect } from "react";
import { surveillanceService } from "../../api/surveillanceService";
import { MapPin, AlertCircle, Filter, Layers, Navigation, ShieldCheck, Activity, Search } from "lucide-react";

export default function DiseaseHotspotMap({ onSelectCluster }) {
  const [hotspots, setHotspots] = useState([]);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [filterDisease, setFilterDisease] = useState("ALL");
  const [selectedDistrict, setSelectedDistrict] = useState("ALL");

  useEffect(() => {
    async function loadData() {
      const data = await surveillanceService.getHotspots();
      setHotspots(data);
      if (data.length > 0) {
        setSelectedHotspot(data[0]);
      }
    }
    loadData();
  }, []);

  const filteredHotspots = hotspots.filter(h => {
    const matchDisease = filterDisease === "ALL" || h.disease.toLowerCase().includes(filterDisease.toLowerCase());
    const matchDistrict = selectedDistrict === "ALL" || h.district === selectedDistrict;
    return matchDisease && matchDistrict;
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Top Filter Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Epidemiological Hotspot & Cluster Map
            </h3>
            <p className="text-xs text-slate-500">
              Live spatial clusters • Village & Block Surveillance (Maharashtra GIS Layer)
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterDisease}
              onChange={(e) => setFilterDisease(e.target.value)}
              className="bg-transparent font-medium text-slate-700 outline-none cursor-pointer"
            >
              <option value="ALL">All Diseases</option>
              <option value="Foot-and-Mouth">FMD (Foot-and-Mouth)</option>
              <option value="Lumpy">LSD (Lumpy Skin)</option>
              <option value="PPR">PPR (Peste des Petits)</option>
              <option value="Brucellosis">Brucellosis</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-2xs">
            <Navigation className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-transparent font-medium text-slate-700 outline-none cursor-pointer"
            >
              <option value="ALL">All Districts</option>
              <option value="Pune">Pune District</option>
              <option value="Satara">Satara District</option>
              <option value="Ahmednagar">Ahmednagar District</option>
            </select>
          </div>
        </div>
      </div>

      {/* Map Layout: GIS Viewport + Inspector Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[420px]">
        {/* Visual Map Canvas */}
        <div className="lg:col-span-2 relative bg-slate-900 p-6 flex flex-col justify-between overflow-hidden">
          {/* Simulated Satellite/Topographic Grid Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
          
          {/* Top GIS Status Overlay */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-300 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-700 w-fit">
            <span className="flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              GPS Geo-Fence Engine: Active • OpenStreetMap / Leaflet Integration
            </span>
          </div>

          {/* Interactive Cluster Nodes on the GIS Grid */}
          <div className="relative z-10 my-10 min-h-[260px] flex items-center justify-center">
            <div className="w-full max-w-lg relative h-64 border border-emerald-500/20 rounded-2xl bg-emerald-950/20 backdrop-blur-xs p-4">
              <div className="absolute top-2 left-3 text-[10px] font-mono text-emerald-400/80">
                ZONE: MAHARASHTRA / WESTERN DESH REGION
              </div>

              {/* Hotspot 1: Pune Wagholi Cluster */}
              <div 
                onClick={() => { setSelectedHotspot(hotspots[0]); onSelectCluster?.(hotspots[0]); }}
                className="absolute top-1/4 left-1/3 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-red-400 opacity-60"></span>
                  <div className={`p-2.5 rounded-full text-white shadow-lg transition transform group-hover:scale-125 ${selectedHotspot?.id === "HSP-01" ? "bg-red-500 ring-4 ring-red-300" : "bg-red-600"}`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>
                <div className="bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded mt-1 whitespace-nowrap shadow-md">
                  Haveli FMD (14 cases)
                </div>
              </div>

              {/* Hotspot 2: Satara Khandala Cluster */}
              <div 
                onClick={() => { setSelectedHotspot(hotspots[1]); onSelectCluster?.(hotspots[1]); }}
                className="absolute bottom-1/4 left-1/4 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-red-400 opacity-50"></span>
                  <div className={`p-2 rounded-full text-white shadow-lg transition transform group-hover:scale-125 ${selectedHotspot?.id === "HSP-02" ? "bg-red-500 ring-4 ring-red-300" : "bg-red-600"}`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
                <div className="bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded mt-1 whitespace-nowrap shadow-md">
                  Satara LSD (29 cases)
                </div>
              </div>

              {/* Hotspot 3: Indapur Goat Herd */}
              <div 
                onClick={() => { setSelectedHotspot(hotspots[2]); onSelectCluster?.(hotspots[2]); }}
                className="absolute bottom-1/3 right-1/4 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  <div className={`p-2 rounded-full text-white shadow-lg transition transform group-hover:scale-125 ${selectedHotspot?.id === "HSP-03" ? "bg-amber-500 ring-4 ring-amber-300" : "bg-amber-600"}`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
                <div className="bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded mt-1 whitespace-nowrap shadow-md">
                  Indapur PPR (7 cases)
                </div>
              </div>

              {/* Hotspot 4: Ahmednagar Dairy */}
              <div 
                onClick={() => { setSelectedHotspot(hotspots[3]); onSelectCluster?.(hotspots[3]); }}
                className="absolute top-1/6 right-1/3 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center">
                  <div className={`p-2 rounded-full text-white shadow-lg transition transform group-hover:scale-125 ${selectedHotspot?.id === "HSP-04" ? "bg-amber-500 ring-4 ring-amber-300" : "bg-amber-600"}`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
                <div className="bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded mt-1 whitespace-nowrap shadow-md">
                  Ahmednagar Brucellosis
                </div>
              </div>
            </div>
          </div>

          {/* Map Footer Legend */}
          <div className="relative z-10 flex flex-wrap items-center gap-4 text-[11px] text-slate-300 pt-2 border-t border-slate-800">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500"></span> High Risk Outbreak
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span> Medium Risk Alert
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Surveillance Normal
            </span>
            <span className="ml-auto text-slate-400">
              Showing {filteredHotspots.length} active spatial clusters
            </span>
          </div>
        </div>

        {/* Cluster Inspector Details Pane */}
        <div className="p-6 bg-white border-l border-slate-200 flex flex-col justify-between">
          {selectedHotspot ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    selectedHotspot.riskLevel === "HIGH" 
                      ? "bg-red-100 text-red-700" 
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    {selectedHotspot.riskLevel} Priority Cluster
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900 mt-1">
                    {selectedHotspot.clusterName}
                  </h4>
                  <p className="text-xs text-slate-500">{selectedHotspot.district} District, Maharashtra</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                  <Activity className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Suspected Pathogen:</span>
                  <span className="font-bold text-slate-800">{selectedHotspot.disease}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Active Confirmed Cases:</span>
                  <span className="font-bold text-red-600">{selectedHotspot.activeCases} animals</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Quarantine Containment Radius:</span>
                  <span className="font-bold text-slate-800">{selectedHotspot.radiusKm} km Buffer</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Transmission Trend:</span>
                  <span className={`font-semibold capitalize ${
                    selectedHotspot.trend === "increasing" ? "text-red-600" : "text-emerald-600"
                  }`}>
                    {selectedHotspot.trend}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Last Field Verification:</span>
                  <span className="font-medium text-slate-700">{selectedHotspot.lastUpdated}</span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Recommended Action:
                </div>
                <p className="text-[11px] leading-relaxed">
                  Ring vaccination within {selectedHotspot.radiusKm}km radius. Mobile veterinary unit deployed with quarantine protocol.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">Select a cluster on the map to view epidemiological details</p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => alert(`Emergency Advisory broadcasted to ${selectedHotspot?.clusterName || "Cluster"} farmers & veterinary field workers.`)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              Broadcast Alert to Local Farmers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
