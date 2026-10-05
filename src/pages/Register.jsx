import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ShieldAlert, UserPlus, Lock, Mail, Phone, MapPin, Building, Award, CheckCircle } from "lucide-react";

export default function Register({ onNavigate }) {
  const { register } = useAuth();
  const [role, setRole] = useState("farmer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [district, setDistrict] = useState("Pune");
  const [block, setBlock] = useState("Haveli");
  const [village, setVillage] = useState("");
  
  // Role specific fields
  const [pashuAadhaar, setPashuAadhaar] = useState("");
  const [livestockCount, setLivestockCount] = useState(5);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [designation, setDesignation] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        name,
        email,
        phone,
        password,
        role,
        district,
        block,
        state: "Maharashtra",
        ...(role === "farmer" ? { village, pashuAadhaar, livestockCount: Number(livestockCount) } : {}),
        ...(role === "veterinarian" ? { licenseNumber, qualification: "B.V.Sc & A.H." } : {}),
        ...(role === "official" ? { designation, department: "Animal Husbandry & Dairying" } : {}),
      };

      await register(payload);
      if (role === "farmer") onNavigate("farmer");
      else if (role === "veterinarian") onNavigate("vet");
      else onNavigate("official");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-500/30">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Create an Account on PashuSuraksha
          </h2>
          <p className="text-xs text-slate-500">
            Join the National Digital Livestock Mission & Disease Surveillance Network
          </p>
        </div>

        {/* Card Box */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          {/* Role Selection Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Registration Role
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setRole("farmer")}
                className={`py-2 px-1 rounded-xl transition ${
                  role === "farmer"
                    ? "bg-white text-emerald-800 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                👨‍🌾 Farmer / Owner
              </button>
              <button
                type="button"
                onClick={() => setRole("veterinarian")}
                className={`py-2 px-1 rounded-xl transition ${
                  role === "veterinarian"
                    ? "bg-white text-emerald-800 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🩺 Veterinarian
              </button>
              <button
                type="button"
                onClick={() => setRole("official")}
                className={`py-2 px-1 rounded-xl transition ${
                  role === "official"
                    ? "bg-white text-emerald-800 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🏛️ Govt Official
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tukaram Patil"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number (for 1962 SMS Alerts)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 00000"
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Geographical Jurisdiction */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                >
                  <option value="Pune">Pune</option>
                  <option value="Satara">Satara</option>
                  <option value="Ahmednagar">Ahmednagar</option>
                  <option value="Solapur">Solapur</option>
                  <option value="Nashik">Nashik</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Taluka / Block</label>
                <input
                  type="text"
                  value={block}
                  onChange={(e) => setBlock(e.target.value)}
                  placeholder="e.g. Haveli"
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Village / Town</label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g. Wagholi"
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none"
                />
              </div>
            </div>

            {/* Role Specific Dynamic Fields */}
            {role === "farmer" && (
              <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 space-y-3">
                <p className="text-xs font-bold text-emerald-900">Farmer & Herd Details (NDLM Integration)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-800 mb-1">
                      Pashu Aadhaar / Farmer ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={pashuAadhaar}
                      onChange={(e) => setPashuAadhaar(e.target.value)}
                      placeholder="e.g. IN-MH-8890-1200"
                      className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-800 mb-1">
                      Approximate Livestock Count
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={livestockCount}
                      onChange={(e) => setLivestockCount(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {role === "veterinarian" && (
              <div className="bg-teal-50/70 border border-teal-100 rounded-2xl p-4 space-y-3">
                <p className="text-xs font-bold text-teal-900">Veterinary Credentials (VCI Verification)</p>
                <div>
                  <label className="block text-[11px] font-semibold text-teal-800 mb-1">
                    State Veterinary Council Registration No.
                  </label>
                  <input
                    type="text"
                    required
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    placeholder="e.g. MH-VET-2024-5582"
                    className="w-full px-3 py-1.5 bg-white border border-teal-200 rounded-xl text-xs"
                  />
                </div>
              </div>
            )}

            {role === "official" && (
              <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 space-y-3">
                <p className="text-xs font-bold text-blue-900">Department Authority</p>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-800 mb-1">
                    Official Cadre / Designation
                  </label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. District Animal Husbandry Officer"
                    className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-xl text-xs"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 text-xs flex items-center justify-center gap-2 transition"
            >
              {loading ? (
                "Creating Account..."
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Complete Registration
                </>
              )}
            </button>
          </form>

          {/* Footer Link to Login */}
          <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
            Already registered?{" "}
            <button
              onClick={() => onNavigate("login")}
              className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              Sign in here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
