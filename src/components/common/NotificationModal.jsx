import React from "react";
import { PhoneCall, X, AlertTriangle, ShieldCheck, Ambulance, Clock, CheckCircle2 } from "lucide-react";

export default function NotificationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-scale-up">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-1.5 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 backdrop-blur rounded-2xl">
              <Ambulance className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Emergency Hotline
              </span>
              <h3 className="text-xl font-extrabold mt-1">1962 Mobile Veterinary Service</h3>
              <p className="text-xs text-red-100">Department of Animal Husbandry & Dairying</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-1">
              <p className="font-bold">Immediate Containment Advisory:</p>
              <ul className="list-disc pl-4 space-y-0.5 text-amber-800">
                <li>Isolate the suspected animal immediately in a separate shed.</li>
                <li>Do not sell, move, or transport herd members outside the village.</li>
                <li>Disinfect feeding troughs with 2% sodium carbonate or lime.</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-700 font-semibold mb-1">
                <Clock className="w-4 h-4 text-emerald-600" />
                Response SLA
              </div>
              <p className="text-slate-500">Average response time is <strong>45-60 mins</strong> for verified high-risk alerts.</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-700 font-semibold mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Coverage
              </div>
              <p className="text-slate-500">Free doorstep diagnosis & emergency medication by Govt MVU.</p>
            </div>
          </div>

          <div className="space-y-2">
            <a
              href="tel:1962"
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition"
            >
              <PhoneCall className="w-5 h-5" />
              Call Toll-Free 1962 Now
            </a>
            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs text-slate-600 hover:text-slate-900 font-medium text-center"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
