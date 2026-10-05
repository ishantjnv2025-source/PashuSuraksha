import React from "react";

export default function StatsCard({ title, value, subtitle, icon: Icon, trend, color = "emerald" }) {
  const colorMap = {
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-100",
      iconBg: "bg-emerald-100 text-emerald-800"
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-100",
      iconBg: "bg-amber-100 text-amber-800"
    },
    rose: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-100",
      iconBg: "bg-rose-100 text-rose-800"
    },
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-100",
      iconBg: "bg-blue-100 text-blue-800"
    },
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      border: "border-indigo-100",
      iconBg: "bg-indigo-100 text-indigo-800"
    }
  };

  const scheme = colorMap[color] || colorMap.emerald;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${scheme.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-3 flex items-center justify-between text-xs border-t border-slate-100 pt-2.5">
          <span className="text-slate-500 truncate">{subtitle}</span>
          {trend && (
            <span className={`font-semibold ${trend.positive ? "text-emerald-600" : "text-rose-600"}`}>
              {trend.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
