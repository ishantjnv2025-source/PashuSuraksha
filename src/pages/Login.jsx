import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ShieldAlert, LogIn, Lock, Mail, ArrowRight, UserCheck, CheckCircle2 } from "lucide-react";

export default function Login({ onNavigate }) {
  const { login } = useAuth();
  const [role, setRole] = useState("farmer");
  const [email, setEmail] = useState("ramesh.farmer@example.com");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === "farmer") {
      setEmail("ramesh.farmer@example.com");
    } else if (selectedRole === "veterinarian") {
      setEmail("dr.ananya@vetcare.gov.in");
    } else {
      setEmail("rajesh.deshmukh@dahd.maharashtra.gov.in");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email, password, role });
      // Redirect to role dashboard
      if (role === "farmer") onNavigate("farmer");
      else if (role === "veterinarian") onNavigate("vet");
      else onNavigate("official");
    } catch (err) {
      setError(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-500/30">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Sign In to PashuSuraksha
          </h2>
          <p className="text-xs text-slate-500">
            Smart Livestock Health & Early-Warning Platform (SIH 2026)
          </p>
        </div>

        {/* Card Box */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          {/* Role Selection Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Your Role
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleRoleSelect("farmer")}
                className={`py-2 px-1 rounded-xl transition ${
                  role === "farmer"
                    ? "bg-white text-emerald-800 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                👨‍🌾 Farmer
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect("veterinarian")}
                className={`py-2 px-1 rounded-xl transition ${
                  role === "veterinarian"
                    ? "bg-white text-emerald-800 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🩺 Vet
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect("official")}
                className={`py-2 px-1 rounded-xl transition ${
                  role === "official"
                    ? "bg-white text-emerald-800 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🏛️ Official
              </button>
            </div>
          </div>

          {/* Quick 1-Click Demo Login Helper */}
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3 text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold">Demo Preset: </span>
                <span className="text-emerald-700 capitalize">{role}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] transition"
            >
              Quick Sign-In
            </button>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email or Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email or registered mobile"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Demo password reset instructions sent to registered mobile/email."); }} className="text-[11px] text-emerald-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="remember" className="ml-2 block text-xs text-slate-600">
                Keep me signed in on this device
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 text-xs flex items-center justify-center gap-2 transition"
            >
              {loading ? (
                "Authenticating..."
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In to {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
                </>
              )}
            </button>
          </form>

          {/* Footer Link to Register */}
          <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
            Don't have an account yet?{" "}
            <button
              onClick={() => onNavigate("register")}
              className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              Register here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
